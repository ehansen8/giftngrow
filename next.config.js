/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  ...nextConfig,
  env: {
    DB_ACCESS_KEY_ID: process.env.DB_ACCESS_KEY_ID,
    DB_SECRET_ACCESS_KEY: process.env.DB_SECRET_ACCESS_KEY,
    NEXT_PUBLIC_GOOGLE_ID: process.env.NEXT_PUBLIC_GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.csv$/,
      loader: 'csv-loader',
      options: {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true
      }
    })
    return config
  }
}
