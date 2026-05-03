import Anthropic from '@anthropic-ai/sdk'

export function getAnthropicClient() {
  return new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })
}

export async function generateText(prompt: string): Promise<string> {
  const client = getAnthropicClient()
  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const content = message.content[0]
  if (content.type === 'text') {
    return content.text
  }

  throw new Error('Unexpected response format from Claude')
}

export async function generateJSON<T>(prompt: string): Promise<T> {
  const client = getAnthropicClient()
  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: `${prompt}\n\nRespond with ONLY valid JSON, no markdown or extra text.`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Expected text response from Claude')
  }

  try {
    return JSON.parse(content.text)
  } catch (error) {
    throw new Error(`Failed to parse JSON response: ${content.text}`)
  }
}
