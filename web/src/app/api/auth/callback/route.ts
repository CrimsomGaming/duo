import { api } from "@/libs/api";
import axios from "axios";
import { URL } from "next/dist/compiled/@edge-runtime/primitives/url";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest ){
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')

   console.log(code)

    const redirectURL = new URL('/', request.url)

    const reponse = await axios.post('http://localhost:8000/auth/login/',{
        code: code,
    })

    console.log(reponse.data)

    return NextResponse.redirect(redirectURL)

    
  

   
}