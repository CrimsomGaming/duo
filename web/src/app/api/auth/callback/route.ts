import { api } from "@/libs/api";
import axios from "axios";
import { URL } from "next/dist/compiled/@edge-runtime/primitives/url";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface AuthResponseProps {
    refresh: string;
    access: string;
}

export async function GET(request: NextRequest ){
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const redirectTo = cookies().get('redirectTo')?.value
   


    const redirectURL = redirectTo  || new URL('/home', request.url)

    const authResponse = await api.post<AuthResponseProps>('/auth/login',{
        code: code,
    })

    const {access,refresh} = authResponse.data

   
    
    const cookieExpiration = 60 * 60 * 24 * 30 // 30 days

    return NextResponse.redirect(redirectURL, {
        headers: {
          'Set-Cookie': [
            `token=${access}; Path=/;  max-age=${cookieExpiration}`,
            `refresh-token=${refresh}; Path=/;  max-age=${cookieExpiration}`
          ] as any,
           
        }
    })

    
  

   
}