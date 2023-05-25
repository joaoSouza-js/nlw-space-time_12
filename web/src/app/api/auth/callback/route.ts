import { api } from '@/libs/api'

import { NextRequest, NextResponse } from 'next/server'

interface RegisterResponse {
  token: string
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const redirectTo = request.cookies.get('redirectTo')?.value

  const resgiterResponse = await api.post<RegisterResponse>('/register', {
    code,
  })

  const redirectUser = redirectTo ?? new URL('/', request.url)

  const cookeiExpiration = 60 * 60 * 24 * 30 // 30 days

  return NextResponse.redirect(redirectUser, {
    headers: {
      'Set-Cookie': `token=${resgiterResponse.data.token}; Path=/;  max-age=${cookeiExpiration}`,
    },
  })
}
