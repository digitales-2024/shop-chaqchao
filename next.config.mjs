/** @type {import('next').NextConfig} */

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    domains: ["pub-843b15cc9c5d4932b34855ee68a2f5be.r2.dev"],
  },
};

export default withNextIntl(nextConfig);
