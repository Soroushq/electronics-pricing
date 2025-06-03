import { NextRequest, NextResponse } from 'next/server';
import { isRouteUnderConstruction } from '@/utils/routeHelpers';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if the route is under construction
  if (isRouteUnderConstruction(pathname)) {
    // Redirect to under construction page with the original path as a parameter
    const url = new URL('/under-construction', request.url);
    url.searchParams.set('path', pathname);
    return NextResponse.redirect(url);
  }
  
  // Continue with the request for all other routes
  return NextResponse.next();
}

export const config = {
  // Match all paths except static files and API routes
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}; 