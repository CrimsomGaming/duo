import jwtDecode from 'jwt-decode'
import { cookies } from 'next/headers'
import { api } from './api'

interface User {
  username: string
  user_image: string
  sub: string
}

export function getUser(): User | undefined {
  const token = cookies().get('token')?.value

  if (!token) return undefined
  
  const user = jwtDecode<User>(token)

  return {
    ...user,
    sub: token
  }
}