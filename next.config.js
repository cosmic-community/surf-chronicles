/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.cosmicjs.com', 'imgix.cosmicjs.com'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
}

module.exports = nextConfig