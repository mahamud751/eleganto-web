import { NextRequest, NextResponse } from 'next/server';

// Optimistic check only: the (panel) layout verifies the session with the API.
export function proxy(req: NextRequest) {
  if (!req.cookies.has('eleganto_admin')) return NextResponse.redirect(new URL('/login', req.url));
}

export const config = { matcher: ['/((?!login|backend|_next/|favicon.ico).*)'] };
