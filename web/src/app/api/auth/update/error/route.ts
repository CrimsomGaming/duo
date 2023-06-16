import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(request: NextRequest, ){
    cookies().delete('token')
    cookies().delete('refresh-token')

   return NextResponse.json({
        message: 'deleted'
   })

    
}