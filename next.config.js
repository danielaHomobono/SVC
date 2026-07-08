/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude client-only packages from server bundle
      config.externals.push('@react-three/fiber', 'three')
    }
    return config
  },
}

module.exports = nextConfig
