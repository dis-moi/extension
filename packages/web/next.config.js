/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { loadEnvConfig } = require('@next/env');
const injectedEnvVars = require('../../injected-env-vars.json');

const packagesRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(__dirname, '../..');

// Next looks for the .env files in the directory of the application only,
// whereas they live at the root of the repository and are shared with the
// extension. Without this explicit load, the shared code compiles with
// `undefined` variables: `BACKEND_ORIGIN + 'contributors'` becomes a relative
// address and the site queries /fr/undefinedcontributors instead of the API.
//
// forceReload is indispensable: Next has already called loadEnvConfig on
// packages/web, which holds no .env, and @next/env would return that empty
// result from its cache.
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
    `BACKEND_ORIGIN is absent or empty: the site cannot reach the API. ` +
      `It is expected at the root of the repository (.env, .env.${process.env.NODE_ENV}) or in the environment of the shell.`,
  );
}

/**
 * The addresses of the WordPress site, which carried no language prefix.
 *
 * They stay indexed by the engines and quoted from the outside — press
 * articles, social networks, messages — while none of them exists on the Next
 * side. Letting them fall into a 404 would lose the accumulated ranking and
 * break those links the day WordPress stops.
 *
 * The extension no longer depends on them: the resources of packages/i18n
 * point straight at the real routes.
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
  // The contributor pages have carried four successive names; the first
  // three stay indexed and shared.
  ['/eclaireurs/:path*', '/fr/profils/:path*'],
  ['/informateurs/:path*', '/fr/profils/:path*'],
  ['/sources/:path*', '/fr/profils/:path*'],
  ['/profils/:path*', '/fr/profils/:path*'],
].map(([source, destination]) => ({ source, destination, permanent: true }));

/**
 * The address the extension opens when it is uninstalled
 * (`UNINSTALL_ORIGIN`). On the WordPress side, the page held nothing but a
 * JavaScript redirection towards this form: the redirection is direct here.
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

  experimental: {
    // The default of Next is 1 MB, below the images the administration
    // uploads; the margin above MAX_SIZE_BYTES covers the multipart envelope,
    // the refusal of an image that is too heavy staying in the domain.
    serverActions: {
      bodySizeLimit: '6mb',
    },
  },

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
    path.resolve(packagesRoot, 'api'),
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
