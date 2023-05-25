import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectUser = new URL('/', request.url)

  return NextResponse.redirect(redirectUser, {
    headers: {
      'Set-Cookie': `token=; Path=/; HttpOnly; max-age=0`,
    },
  })
}
