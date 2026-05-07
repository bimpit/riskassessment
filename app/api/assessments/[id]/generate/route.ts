import { createClient, createServiceRoleClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const serviceRole = await createServiceRoleClient()
    const serviceRoleAny = serviceRole as any

    const { data: teamMember } = await serviceRoleAny
      .from('team_members')
      .select('team_id')
      .eq('user_id', user.id)
      .limit(1)
      .single()

    if (!teamMember) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 })
    }

    const [subResult, countResult] = await Promise.all([
      serviceRoleAny
        .from('subscriptions')
        .select('status')
        .eq('team_id', teamMember.team_id)
        .maybeSingle(),
      serviceRoleAny
        .from('audit_log')
        .select('id', { count: 'exact', head: true })
        .eq('team_id', teamMember.team_id)
        .in('entity_type', ['assessments', 'assessment'])
        .eq('action', 'ai_generated'),
    ])

    const isPro = subResult.data?.status === 'active'
    const generationsUsed = countResult.count ?? 0
    const canGenerate = isPro || generationsUsed < 1

    return NextResponse.json({ canGenerate, isPro, generationsUsed })
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: assessmentId } = await params
    const { domain, context } = await request.json()

    if (!context?.trim()) {
      return NextResponse.json({ error: 'Context is required' }, { status: 400 })
    }

    // Get team_id via service role
    const serviceRole = await createServiceRoleClient()
    const serviceRoleAny = serviceRole as any

    const { data: teamMember } = await serviceRoleAny
      .from('team_members')
      .select('team_id')
      .eq('user_id', user.id)
      .limit(1)
      .single()

    if (!teamMember) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 })
    }

    // Check free-tier hard limit — count lifetime AI generations from audit_log
    const [subResult, countResult] = await Promise.all([
      serviceRoleAny
        .from('subscriptions')
        .select('status')
        .eq('team_id', teamMember.team_id)
        .maybeSingle(),
      serviceRoleAny
        .from('audit_log')
        .select('id', { count: 'exact', head: true })
        .eq('team_id', teamMember.team_id)
        .in('entity_type', ['assessments', 'assessment'])
        .eq('action', 'ai_generated'),
    ])

    const isPro = subResult.data?.status === 'active'
    if (!isPro && (countResult.count ?? 0) >= 1) {
      return NextResponse.json(
        { error: 'Upgrade to Pro to generate more risk assessments', upgrade: true },
        { status: 403 }
      )
    }

    // Generate risks with Claude
    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: `You are a risk assessment expert. Generate 5-8 realistic risks for a ${domain} risk assessment.

Context: ${context}

Return ONLY a valid JSON array with no extra text. Each risk object must have these exact fields:
- title: string (short, max 80 chars)
- description: string (1-2 sentences)
- category: string (e.g. "Safety", "Compliance", "Operational", "Financial", "HR")
- likelihood: number between 1 and 5 (1=rare, 5=almost certain)
- consequence: number between 1 and 5 (1=insignificant, 5=catastrophic)

Example format:
[{"title":"...","description":"...","category":"...","likelihood":3,"consequence":4}]`,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      return NextResponse.json({ error: 'Unexpected AI response' }, { status: 500 })
    }

    // Parse the JSON response
    let generatedRisks: Array<{
      title: string
      description: string
      category: string
      likelihood: number
      consequence: number
    }>

    try {
      const text = content.text.trim()
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (!jsonMatch) throw new Error('No JSON array found')
      generatedRisks = JSON.parse(jsonMatch[0])
    } catch {
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 })
    }

    // Insert risks into database
    const risksToInsert = generatedRisks.map((risk) => ({
      assessment_id: assessmentId,
      team_id: teamMember.team_id,
      title: risk.title,
      description: risk.description,
      category: risk.category,
      likelihood: Math.min(5, Math.max(1, Number(risk.likelihood))),
      consequence: Math.min(5, Math.max(1, Number(risk.consequence))),
      status: 'open',
      ai_generated: true,
    }))

    const { data: insertedRisks, error: insertError } = await serviceRoleAny
      .from('risks')
      .insert(risksToInsert)
      .select()

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    await serviceRoleAny.from('audit_log').insert({
      team_id: teamMember.team_id,
      user_id: user.id,
      action: 'ai_generated',
      entity_type: 'assessments',
      entity_id: assessmentId,
    })

    return NextResponse.json(insertedRisks)
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
