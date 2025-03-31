/** @type {import('next').NextConfig} */

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    domains: ["pub-b968cd75d23f41bf90ea2c70ff12436f.r2.dev"],
  },
};

export default withNextIntl(nextConfig);
