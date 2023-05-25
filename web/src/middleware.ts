import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const SignInUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`
  const userIsLogged = request.cookies.has('token')

  if (!userIsLogged) {
    return NextResponse.redirect(SignInUrl, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; max-age=60; HttpOnly; Path=/`,
      },
    })
  }
}

export const config = {
  matcher: '/memories/:path*',
}
