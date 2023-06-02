
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {


  const userIsLoged = request.cookies.has('token')


  const redirectUrl = new URL('/home', request.url)

  if(userIsLoged) { 
    return NextResponse.redirect(redirectUrl)
  }
}


export const config = {
  matcher: '/',
};