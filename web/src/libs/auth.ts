import jwtDecode from 'jwt-decode'
import { cookies } from 'next/headers'

interface User {
  name: string
  avatarUrl: string
  sub: string
}

export function getUser(): User {
  const token = cookies().get('token')?.value

  if (!token) {
    throw new Error('user not authenticated')
  }

  const user = jwtDecode<User>(token)

  return user
}
