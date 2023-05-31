import { api } from "@/libs/api";
import { URL } from "next/dist/compiled/@edge-runtime/primitives/url";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest ){
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')

   const reponse = api.post('/session',{
        code: code
   })

    const redirectURL = new URL('/', request.url)

    return NextResponse.redirect(redirectURL)

    
  

   
}