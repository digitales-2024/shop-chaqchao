const baseUrl = process.env.NEXT_PUBLIC_WEB_CHAQCHAO
  ? `https://${process.env.NEXT_PUBLIC_WEB_CHAQCHAO}`
  : "http://localhost:3001";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
