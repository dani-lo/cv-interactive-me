/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  compress: false,
  // output: 'standalone',
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
  webpack: (config, {dev, isServer, defaultLoaders}) => {
    console.log('------------------ options.webpack.version'); // Should be webpack v5 now
    if (dev && !isServer) {
      
      const originalEntry = config.entry

      config.entry = async () => {
      
        const entries = await originalEntry();
      
        if (entries['main.js'] && !entries['main.js'].includes('./src/helpers/whyDidYouRender.js')) {
          entries['main.js'].unshift('./src/helpers/whyDidYouRender.js');
        }
        return entries;
      }
    }
    return config;
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
