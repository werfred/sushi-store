const withPlugins = require('next-compose-plugins')

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [process.env.NEXT_PUBLIC_DOMAIN, '127.0.0.1']
  },
  async redirects() {
    return [
      {
        source: '/sushi',
        destination: '/',
        permanent: true
      }
    ]
  },
  i18n: {
    locales: ['en', 'uk'],
    defaultLocale: 'uk',
  }
}


module.exports = withPlugins([], nextConfig)
