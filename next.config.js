/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const nextConfig = {
  compiler: {
    removeConsole: true
  },
  images: {
    domains: ['www.poptelecom.co.uk','www.broadbandbroker.co.uk'],
  },
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );
    return config;
  },
};

// module.exports = withBundleAnalyzer({...nextConfig})
module.exports = (nextConfig)

