import { NextRequest } from "next/server";

// Función para extraer el token de la solicitud
export function getToken(req: NextRequest): string | undefined {
  return req.cookies.get("client_refresh_token")?.value;
}
