import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_WEB_CHAQCHAO
  ? `https://${process.env.NEXT_PUBLIC_WEB_CHAQCHAO}`
  : "http://localhost:3001";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap = ["", "/categories", "/workshops"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routesMap];
}
