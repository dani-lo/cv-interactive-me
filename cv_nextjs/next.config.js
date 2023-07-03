/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: '/jobs/:path*',
        destination: '/jobs',
      },
      {
        source: '/projects/:path*',
        destination: '/projects',
      }
    ]
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/jobs',
  //       destination: '/jobs/all',
  //       permanent: true,
  //     },
  //   ]
  // },
}

module.exports = nextConfig
