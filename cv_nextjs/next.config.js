/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
  // async redirects() {
  //   return [
  //     {
  //       source: '/jobs/:uid',
  //       destination: '/jobs',
  //       permanent: false,
  //     },
  //   ]
  // },
}

module.exports = nextConfig
