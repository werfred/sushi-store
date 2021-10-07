const withPlugins = require('next-compose-plugins')

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [process.env.NEXT_PUBLIC_DOMAIN]
  },
  async redirects() {
    return [
      {
        source: '/sushi',
        destination: '/',
        permanent: true
      }
    ]
  }
}


module.exports = withPlugins([], nextConfig)
