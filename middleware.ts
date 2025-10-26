import { auth } from '@/lib/auth';

export default auth((req) => {
  const isAuthenticated = !!req.auth;
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = req.nextUrl.pathname === '/admin/login';

  console.log('🛡️ Middleware check:', {
    path: req.nextUrl.pathname,
    authenticated: isAuthenticated,
  });

  // Redirect unauthenticated users to login
  if (isAdminRoute && !isAuthenticated && !isLoginPage) {
    console.log('🚫 Redirecting to login');
    return Response.redirect(new URL('/admin/login', req.url));
  }

  // Redirect authenticated users away from login
  if (isLoginPage && isAuthenticated) {
    console.log('✅ Already authenticated, redirecting to admin');
    return Response.redirect(new URL('/admin', req.url));
  }
});

export const config = {
  matcher: ['/admin/:path*'],
};