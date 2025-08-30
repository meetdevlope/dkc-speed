import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "utils/getToken";

const authRoutes = ["/account", "/checkout", "/wishlist", "/cart"];
const publicOnlyRoutes = ["/login", "/register", "/otp-verification"];

function isProtectedRoute(path: string) {
  return authRoutes.some((route) => path.startsWith(route));
}

function isPublicOnlyRoute(path: string) {
  return publicOnlyRoutes.includes(path);
}

export async function middleware(req: NextRequest) {
  const token = getToken();
  const path = req.nextUrl.pathname;

  if (path === "/undefined") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const redirectTo = isProtectedRoute(path)
    ? encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search)
    : "";

  if (!token) {
    // Allow access to public-only routes (login, register, otp)
    if (isPublicOnlyRoute(path)) {
      return NextResponse.next();
    }

    // Redirect to login only for protected routes
    if (isProtectedRoute(path)) {
      return NextResponse.redirect(
        new URL(`/login?redirectTo=${redirectTo}`, req.url),
      );
    }

    // Allow access to other public routes (home, etc.)
    return NextResponse.next();
  }

  // If token exists, validate it
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/is-authenticated`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    const data = await res.json();

    // Token is valid and user is authenticated
    if (res.ok && data?.data) {
      // Prevent authenticated users from accessing login/register/otp
      if (isPublicOnlyRoute(path)) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      // Allow access to all other routes
      return NextResponse.next();
    }

    // Token is invalid or expired - only redirect if on protected route
    if (isProtectedRoute(path)) {
      return NextResponse.redirect(
        new URL(`/login?redirectTo=${redirectTo}`, req.url),
      );
    }

    // For public routes with invalid token, just continue (let them access public content)
    return NextResponse.next();
  } catch (error) {
    console.error("Auth check failed:", error);

    // Only redirect to login if accessing protected route
    if (isProtectedRoute(path)) {
      return NextResponse.redirect(
        new URL(`/login?redirectTo=${redirectTo}`, req.url),
      );
    }

    // For public routes, continue even if auth check fails
    return NextResponse.next();
  }
}

export const config = {
  // Only run middleware on routes that actually need protection
  matcher: [
    "/account/:path*",
    "/checkout",
    "/wishlist",
    "/cart",
    "/login",
    "/register",
    "/otp-verification",
    "/undefined",
  ],
};
