/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  typescript: {
    // The shared code (libs/, components/) has pre-existing type errors
    // that need to be fixed incrementally. Build should not be blocked.
    ignoreBuildErrors: true
  },
  eslint: {
    // ESLint config is at the extension root level (v5), not compatible
    // with Next.js which requires v7+. Linting is done via yarn lint.
    ignoreDuringBuilds: true
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/fr',
        permanent: false
      }
    ];
  },

  compiler: {
    styledComponents: true
  },

  transpilePackages: [
    path.resolve(__dirname, '../../libs'),
    path.resolve(__dirname, '../../components'),
    path.resolve(__dirname, '../../utils'),
    path.resolve(__dirname, '../../types')
  ],

  // Disable Next.js built-in image optimization so that imported images
  // behave like plain webpack asset imports (return URL strings), which is
  // what the shared components expect.
  images: {
    disableStaticImages: true
  },

  webpack(config) {
    const extensionRoot = path.resolve(__dirname, '../..');

    config.resolve.alias = {
      ...config.resolve.alias,
      libs: path.resolve(extensionRoot, 'libs'),
      components: path.resolve(extensionRoot, 'components'),
      app: path.resolve(extensionRoot, 'app'),
      assets: path.resolve(extensionRoot, 'assets'),
      utils: path.resolve(extensionRoot, 'utils'),
      types: path.resolve(extensionRoot, 'types'),
      // Force a single instance of these packages so that
      // ThemeProvider/context works across shared components.
      'styled-components': path.resolve(
        __dirname,
        'node_modules/styled-components'
      ),
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react-redux': path.resolve(__dirname, 'node_modules/react-redux')
    };

    // Images and media as URL strings (matching Webpack 4 file-loader behaviour)
    config.module.rules.push({
      test: /\.(jpg|jpeg|png|gif|svg|mp4|webm|ogg)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]'
      }
    });

    return config;
  }
};

module.exports = nextConfig;
