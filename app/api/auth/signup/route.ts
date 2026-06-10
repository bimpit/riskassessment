import { createClient } from '@/lib/supabase/server'
import { createServiceRoleClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password, fullName, organization } = await request.json()

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create user with Supabase Auth
    const supabase = await createClient()
    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.risk-assessment.com.au'
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          organization,
        },
        emailRedirectTo: `${siteUrl}/api/auth/callback`,
      },
    })

    if (signUpError) {
      console.error('Supabase signUp error:', JSON.stringify({
        message: signUpError.message,
        status: signUpError.status,
        name: signUpError.name,
        code: (signUpError as any).code,
      }, null, 2))
    }

    // Hard fail: no user created at all
    if (!signUpData?.user) {
      const rawMessage = signUpError?.message || ''
      const isTechnicalError =
        !rawMessage ||
        rawMessage === '{}' ||
        rawMessage.includes('<!DOCTYPE') ||
        rawMessage.includes('Unexpected token') ||
        rawMessage.includes('not valid JSON')
      const message = isTechnicalError
        ? 'Unable to create account. Please try again later.'
        : rawMessage
      return NextResponse.json({ error: message }, { status: 400 })
    }

    // Soft fail: user was created but confirmation email failed to send — still proceed
    const emailFailed = !!signUpError
    if (emailFailed) {
      console.warn('User created but confirmation email failed. Proceeding with profile setup.')
    }

    console.log('SignUp user created:', { email: signUpData.user.email, emailFailed })

    // Check if service role key is available
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('SUPABASE_SERVICE_ROLE_KEY is not set in environment')
      return NextResponse.json(
        { error: 'Server configuration error: missing SUPABASE_SERVICE_ROLE_KEY' },
        { status: 500 }
      )
    }

    // Use service role to create profile and team
    const serviceRole = await createServiceRoleClient()
    const serviceRoleAny = serviceRole as any

    // Check if a profile with this email already exists
    const { data: existingProfile } = await serviceRoleAny
      .from('profiles')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    if (existingProfile) {
      return NextResponse.json(
        { error: 'An account with this email already exists. Please sign in.' },
        { status: 400 }
      )
    }

    // Create profile
    const { error: profileError } = await serviceRoleAny
      .from('profiles')
      .insert({
        id: signUpData.user.id,
        email,
        full_name: fullName,
        organization,
        role: 'user',
      })

    if (profileError) {
      console.error('Profile creation error:', profileError)
      console.error('Profile error details:', JSON.stringify(profileError, null, 2))
      return NextResponse.json(
        { error: `Failed to create profile: ${profileError.message || JSON.stringify(profileError)}` },
        { status: 400 }
      )
    }

    // Create default team
    const { data: teamData, error: teamError } = await serviceRoleAny
      .from('teams')
      .insert({
        name: `${fullName}'s Team`,
        owner_id: signUpData.user.id,
        subscription_tier: 'free',
      })
      .select()
      .single()

    if (teamError) {
      console.error('Team creation error:', teamError)
      console.error('Team error details:', JSON.stringify(teamError, null, 2))
      return NextResponse.json(
        { error: `Failed to create team: ${teamError.message || JSON.stringify(teamError)}` },
        { status: 400 }
      )
    }

    if (!teamData) {
      return NextResponse.json(
        { error: 'Failed to create team' },
        { status: 400 }
      )
    }

    // Add user to team (or update if already exists)
    const { error: teamMemberError } = await serviceRoleAny
      .from('team_members')
      .upsert({
        team_id: teamData.id,
        user_id: signUpData.user.id,
        role: 'admin',
        joined_at: new Date().toISOString(),
      }, { onConflict: 'team_id,user_id' })

    if (teamMemberError) {
      console.error('Team member creation error:', teamMemberError)
      console.error('Team member error details:', JSON.stringify(teamMemberError, null, 2))
      return NextResponse.json(
        { error: `Failed to add user to team: ${teamMemberError.message || JSON.stringify(teamMemberError)}` },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: true, user: signUpData.user, emailSent: !emailFailed },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('Error details:', errorMessage)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
