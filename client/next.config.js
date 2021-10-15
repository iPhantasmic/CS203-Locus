module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://locus-g3gtexqeba-uc.a.run.app/:path*' // Proxy to Backend
      }
    ]
  }
}
