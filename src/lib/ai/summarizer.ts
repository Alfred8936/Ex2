interface GitHubModelsResponse {
  choices: {
    message: {
      content: string
    }
  }[]
}

export async function generateSummary(text: string): Promise<string> {
  const endpoint = process.env.GITHUB_MODEL_ENDPOINT || 'https://models.inference.ai.azure.com'
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    throw new Error('GITHUB_TOKEN is not configured')
  }

  // Truncate text if too long (GitHub Models has token limits)
  const maxChars = 10000
  const truncatedText = text.length > maxChars ? text.substring(0, maxChars) + '...' : text

  try {
    const response = await fetch(`${endpoint}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that creates concise and informative summaries of documents. Provide a clear, well-structured summary that captures the main points and key information.'
          },
          {
            role: 'user',
            content: `Please provide a comprehensive summary of the following text:\n\n${truncatedText}`
          }
        ],
        model: 'gpt-4o-mini',
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('GitHub Models API error:', errorText)
      throw new Error(`GitHub Models API error: ${response.status}`)
    }

    const data: GitHubModelsResponse = await response.json()
    return data.choices[0]?.message?.content || 'No summary generated'
  } catch (error) {
    console.error('Error generating summary:', error)
    throw new Error('Failed to generate summary')
  }
}
