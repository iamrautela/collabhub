import { NextRequest, NextResponse } from 'next/server'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(request: NextRequest) {
  try {
    const { type, content, context } = await request.json()

    let prompt = ''
    
    switch (type) {
      case 'pr_review':
        prompt = `Analyze this pull request and provide helpful suggestions for improvement:
        
Title: ${context.title}
Description: ${context.description}
Files changed: ${context.filesChanged}
Code diff: ${content}

Provide 3-5 specific, actionable suggestions for code quality, security, performance, or best practices.`
        break
        
      case 'issue_analysis':
        prompt = `Analyze this GitHub issue and provide helpful suggestions:
        
Title: ${context.title}
Description: ${content}

Provide suggestions for:
1. How to better describe the issue
2. What information might be missing
3. Potential solutions or next steps`
        break
        
      default:
        return NextResponse.json({ error: 'Invalid suggestion type' }, { status: 400 })
    }

    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt,
      system: 'You are an expert software engineer and code reviewer. Provide helpful, specific, and actionable suggestions. Be concise but thorough.'
    })

    // Parse the response into individual suggestions
    const suggestions = text.split('\n').filter(line => line.trim().length > 0)

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('AI suggestion error:', error)
    return NextResponse.json({ error: 'Failed to generate suggestions' }, { status: 500 })
  }
}
