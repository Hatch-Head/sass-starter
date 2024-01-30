import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
    const userToken = false

    if (!userToken) {
        console.log("Boop1")
        return NextResponse.redirect(new URL('/desired-1', request.url))
    }

    else {
        console.log("Boop2")

        return NextResponse.redirect(new URL('/desired-route', request.url))
    }
}

export const config = {
    matcher: /\.(.*)$/,
}