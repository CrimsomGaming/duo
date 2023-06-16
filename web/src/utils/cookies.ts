import { cookies } from "next/headers"

export async function  updateTokens(refresh: string, token: string) {
    'use server'
    cookies().set('token', token)
    cookies().set('refresh-token',refresh)
}