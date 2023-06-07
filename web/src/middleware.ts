
import { NextRequest, NextResponse } from "next/server";
import { api } from './libs/api';

export function middleware(request: NextRequest) {


  const userIsLoged = request.cookies.has('token')
  


  const redirectUrl = new URL('/home', request.url)

  if(userIsLoged) { 
    const token  = request.cookies.get('token')?.value

    api.defaults.headers.common.Authorization = `dsd`

    return NextResponse.redirect(redirectUrl)
  }
}


export const config = {
  matcher:'/',
};