/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { loadEnvConfig } = require('@next/env');
const injectedEnvVars = require('../../injected-env-vars.json');

const packagesRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(__dirname, '../..');

// Next ne cherche les fichiers .env que dans le dossier de l'application,
// alors qu'ils vivent à la racine du dépôt et sont partagés avec l'extension.
// Sans ce chargement explicite, le code commun compile avec des variables
// `undefined` : `BACKEND_ORIGIN + 'contributors'` devient une URL relative et
// le site interroge /fr/undefinedcontributors au lieu de l'API.
//
// forceReload est indispensable : Next a déjà appelé loadEnvConfig sur
// packages/web, qui ne contient aucun .env, et @next/env renverrait ce
// résultat vide depuis son cache.
const { combinedEnv } = loadEnvConfig(
  repoRoot,
  process.env.NODE_ENV !== 'production',
  console,
  true,
);

const env = Object.fromEntries(
  injectedEnvVars
    .filter((name) => combinedEnv[name] !== undefined)
    .map((name) => [name, combinedEnv[name]]),
);

if (!env.BACKEND_ORIGIN) {
  throw new Error(
    `BACKEND_ORIGIN est absente ou vide : le site ne peut pas joindre l'API. ` +
      `Elle est attendue à la racine du dépôt (.env, .env.${process.env.NODE_ENV}) ou dans l'environnement du shell.`,
  );
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env,
  reactStrictMode: true,
  output: 'standalone',
  typescript: {
    // The shared code has pre-existing type errors
    // that need to be fixed incrementally. Build should not be blocked.
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLint config is at the monorepo root level (v5), not compatible
    // with Next.js which requires v7+. Linting is done via yarn lint.
    ignoreDuringBuilds: true,
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/fr',
        permanent: false,
      },
    ];
  },

  compiler: {
    styledComponents: true,
  },

  transpilePackages: [
    path.resolve(packagesRoot, 'domain'),
    path.resolve(packagesRoot, 'ui'),
    path.resolve(packagesRoot, 'i18n'),
    path.resolve(packagesRoot, 'extension'),
  ],

  // Disable Next.js built-in image optimization so that imported images
  // behave like plain webpack asset imports (return URL strings), which is
  // what the shared components expect.
  images: {
    disableStaticImages: true,
  },

  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Shared packages (new canonical paths)
      '@dismoi/domain': path.resolve(packagesRoot, 'domain'),
      '@dismoi/ui': path.resolve(packagesRoot, 'ui'),
      '@dismoi/i18n': path.resolve(packagesRoot, 'i18n'),
      '@dismoi/extension': path.resolve(packagesRoot, 'extension'),
      '@dismoi/web': path.resolve(__dirname),

      // Backward-compat aliases for old import paths used in shared packages
      'libs/store': path.resolve(packagesRoot, 'extension/store'),
      'libs/api': path.resolve(packagesRoot, 'extension/api-client'),
      'libs/tracking': path.resolve(packagesRoot, 'extension/tracking'),
      'libs/hooks': path.resolve(packagesRoot, 'extension/hooks'),
      'libs/webext': path.resolve(packagesRoot, 'extension/webext'),
      'libs/facets': path.resolve(packagesRoot, 'extension/facets'),
      'libs/utils': path.resolve(packagesRoot, 'extension/utils'),
      'app/background': path.resolve(packagesRoot, 'extension/background'),
      'app/content': path.resolve(packagesRoot, 'extension/content'),
      'app/profiles': path.resolve(packagesRoot, 'extension/profiles'),
      assets: path.resolve(packagesRoot, 'extension/assets'),
      types: path.resolve(packagesRoot, 'extension/types'),
      utils: path.resolve(packagesRoot, 'extension/utils'),
    };

    // Images and media as URL strings (matching Webpack 4 file-loader behaviour)
    config.module.rules.push({
      test: /\.(jpg|jpeg|png|gif|svg|mp4|webm|ogg)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    });

    return config;
  },
};

module.exports = nextConfig;
