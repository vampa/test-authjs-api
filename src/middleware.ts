import { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { auth } from "@/auth";
import { APIRoute, Route } from "@/core/enums/routes";

import { i18n } from "../i18n.config";

const protectedPaths = [...Object.values(Route), ...Object.values(APIRoute)];

function getProtectedRoutes(protectedPaths: string[], locales: string[]) {
  let protectedPathsWithLocale = [...protectedPaths];

  protectedPaths.forEach((route) => {
    locales.forEach(
      (locale) =>
        (protectedPathsWithLocale = [
          ...protectedPathsWithLocale,
          `/${locale}${route}`,
        ])
    );
  });

  return protectedPathsWithLocale;
}

const intlMiddleware = createIntlMiddleware(i18n);

const authMiddleware = auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const protectedPathsWithLocale = getProtectedRoutes(protectedPaths, [
    ...i18n.locales,
  ]);
  const isProtectedRoute = protectedPaths;

  // Handle different route scenarios
  if (!isProtectedRoute) return;

  if (!isLoggedIn && protectedPathsWithLocale.includes(nextUrl.pathname)) {
    return Response.redirect(new URL("/api/auth/signin", nextUrl));
  }

  if (isLoggedIn) {
    return intlMiddleware(req); // Apply internationalization for logged-in users
  }
});

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(<span class="math-inline">\{locales\.join\("\|"\)\}\)\)?\(</span>{publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req); // Apply internationalization for public pages
  } else {
    // eslint-disable-next-line
    return (authMiddleware as any)(req); // Apply authentication logic for non-public pages
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)"],
};
