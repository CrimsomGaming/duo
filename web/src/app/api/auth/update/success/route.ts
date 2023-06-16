import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(request: NextRequest, ){
    
    const body = await request.json()
    const {token, refresh} = body
  const redirectURL = new URL('/home', request.url)
    
  const cookieExpiration = 60 * 60 * 24 * 30 // 30 days
    cookies().set('token', token)
    cookies().set('refresh-token',refresh)

      return NextResponse.redirect(redirectURL, {
        headers: {
          'Set-Cookie': [
            `token=${token}; Path=/;  max-age=${cookieExpiration}`,
            `refresh-token=${refresh}; Path=/;  max-age=${cookieExpiration}`
          ] as any,
           
        }
    })

    
}