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

/**
 * Les adresses du site WordPress, qui n'avaient pas de préfixe de langue.
 *
 * Elles restent indexées par les moteurs et citées depuis l'extérieur —
 * articles de presse, réseaux sociaux, messages — alors qu'aucune n'existe
 * côté Next. Les laisser tomber en 404 perdrait le référencement accumulé et
 * casserait ces liens le jour où WordPress s'arrête.
 *
 * L'extension, elle, n'en dépend plus : `packages/i18n/resources/*​/
 * extension.json` pointe désormais directement sur les routes réelles.
 */
const legacyRedirects = [
  ['/aide', '/fr/aide'],
  ['/apparition', '/fr/apparition'],
  ['/probleme-apparition-bulles', '/fr/probleme-apparition-bulles'],
  ['/vie-privee', '/fr/privacy'],
  ['/contact', '/fr/contact'],
  ['/cgu', '/fr/tcu'],
  ['/a-propos', '/fr/a-propos'],
  ['/desinstaller', '/fr/desinstaller'],
  ['/profils', '/fr/profils'],
  ['/mes-abonnements', '/fr/mes-abonnements'],
  ['/a-propos-dismoi', '/fr/a-propos'],
  ['/informer', '/fr/contribuer'],
  ['/confidentialite', '/fr/confidentialite'],
  ['/espace-presse', '/fr/espace-presse'],
  ['/mentions-legales', '/fr/mentions-legales'],
  ['/application-dismoi', '/fr/application-dismoi'],
  ['/arnaques', '/fr/arnaques'],
  ['/comparaison-autres-rs', '/fr/comparaison-autres-rs'],
  ['/dismoi-en-peril', '/fr/dismoi-en-peril'],
  [
    '/dismoi-momentanement-indisponible',
    '/fr/dismoi-momentanement-indisponible',
  ],
  ['/edge', '/fr/edge'],
  ['/financement', '/fr/financement'],
  ['/navigateur-non-supporte', '/fr/navigateur-non-supporte'],
  ['/opera', '/fr/opera'],
  ['/vitesse-navigation', '/fr/vitesse-navigation'],
  ['/en/privacy-policy', '/en/privacy'],
  // Les pages contributeurs ont porté quatre noms successifs ; les trois
  // premiers restent indexés et partagés.
  ['/eclaireurs/:path*', '/fr/profils/:path*'],
  ['/informateurs/:path*', '/fr/profils/:path*'],
  ['/sources/:path*', '/fr/profils/:path*'],
  ['/profils/:path*', '/fr/profils/:path*'],
].map(([source, destination]) => ({ source, destination, permanent: true }));

/**
 * L'adresse que l'extension ouvre à sa désinstallation (`UNINSTALL_ORIGIN`).
 * Côté WordPress, la page ne contenait qu'une redirection JavaScript vers ce
 * formulaire : on redirige directement.
 */
legacyRedirects.push({
  source: '/desinstallation',
  destination: 'https://form.jotformeu.com/92173584558367',
  permanent: false,
});

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
      ...legacyRedirects,
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
