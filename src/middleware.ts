import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getToken } from "./lib/jwt/getToken";
import { redirectToLogin } from "./lib/jwt/redirectToLogin";

// Rutas que requieren autenticación
const protectedRoutes = ["/profile"];

// Rutas de autenticación (accesibles solo por usuarios no autenticados)
const authRoutes = [
  "/sign-in",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export async function middleware(request: NextRequest) {
  const token = getToken(request);
  const { pathname } = request.nextUrl;

  // Normalizar el pathname eliminando barras finales y convirtiendo a minúsculas
  const normalizedPathname = pathname.replace(/\/+$/, "").toLowerCase() || "/";

  // Función para verificar si la ruta coincide con alguna en la lista
  const isRouteMatching = (pathList: string[]) => {
    return pathList.some((route) => {
      // Manejar rutas dinámicas con comodines
      const routePattern = new RegExp(
        "^" + route.replace(/\[.*?\]/g, "[^/]+") + "$",
      );
      return routePattern.test(normalizedPathname);
    });
  };

  if (token) {
    // Usuario autenticado
    if (isRouteMatching(authRoutes)) {
      // Redirigir al dashboard si intenta acceder a rutas de autenticación
      return NextResponse.redirect(new URL("/", request.url));
    }
    // Permitir acceso a rutas protegidas y públicas
    return NextResponse.next();
  } else {
    // Usuario no autenticado
    if (isRouteMatching(protectedRoutes)) {
      // Redirigir al login si intenta acceder a rutas protegidas
      return redirectToLogin(request);
    }
    // Permitir acceso a rutas públicas, incluyendo "/"
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
