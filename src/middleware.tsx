import { log } from 'console'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Auth from './app/lib/auth'
import { CookiesName } from './app/lib/consts'
 
// This function can be marked `async` if using `await` inside
export async function  middleware(request: NextRequest) {
  let cookie = request.cookies.get(CookiesName.roocketToken)
   
  if(cookie === undefined)    
     return NextResponse.redirect(new URL('/login', request.url))
  if( await Auth(cookie.value))
    {
      if(request.nextUrl.pathname == "/admin" ||
      request.nextUrl.pathname == "/"
    )
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  else
    return NextResponse.redirect(new URL('/login', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*','/'],
}