import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  
  if (!code) {
    return NextResponse.redirect(new URL('/auth/signin?error=no_code', request.url))
  }

  try {
    // Exchange code for access token with backend
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000'
    const response = await fetch(`${backendUrl}/api/auth/github`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Authentication failed')
    }

    // Set JWT token in cookie and redirect to dashboard
    const redirectResponse = NextResponse.redirect(new URL('/dashboard', request.url))
    redirectResponse.cookies.set('auth_token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return redirectResponse
  } catch (error) {
    console.error('GitHub auth callback error:', error)
    return NextResponse.redirect(new URL('/auth/signin?error=auth_failed', request.url))
  }
}
