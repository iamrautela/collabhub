import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('github_token')?.value
  const searchParams = request.nextUrl.searchParams
  const repo = searchParams.get('repo')

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  if (!repo) {
    return NextResponse.json({ error: 'Repository parameter required' }, { status: 400 })
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/pulls?state=open`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch pull requests')
    }

    const pullRequests = await response.json()
    return NextResponse.json(pullRequests)
  } catch (error) {
    console.error('Error fetching pull requests:', error)
    return NextResponse.json({ error: 'Failed to fetch pull requests' }, { status: 500 })
  }
}
