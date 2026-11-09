import { defineConfig } from 'wxt';
import path from 'path';
import { version } from '../../package.json';
import {
  assertRequiredEnv,
  INJECTED_ENV_VARS,
  resolveInjectedEnv,
} from './buildEnv';

/** Racine du dépôt : c'est là que vivent les fichiers `.env.*`. */
const envDir = path.resolve(__dirname, '../..');

export default defineConfig({
  srcDir: '.',
  outDir: '.output',
  modules: ['@wxt-dev/module-react'],
  // WXT vise MV2 pour Firefox et MV3 pour Chrome : sans cette ligne, les deux
  // navigateurs ne recevaient pas le même manifeste. Firefox n'a pas de
  // service worker — il sert la même déclaration sous forme de page
  // d'événements —, et c'est WXT qui s'en charge selon la cible.
  manifestVersion: 3,
  // Le gabarit par défaut ne distingue que le navigateur : les trois canaux
  // produiraient le même fichier et s'écraseraient l'un l'autre dans
  // `.output`. Le mode entre donc dans le nom.
  zip: {
    // `{{name}}` et `{{packageVersion}}` viennent du `package.json` de ce
    // dossier, qui n'en porte ni l'un ni l'autre : la version du projet vit à
    // la racine et c'est elle qui alimente le manifeste. D'où `{{version}}`,
    // qui lit le manifeste, et un nom donné explicitement.
    name: 'dismoi',
    artifactTemplate: '{{name}}-{{version}}-{{mode}}-{{browser}}.zip',
    sourcesTemplate: '{{name}}-{{version}}-{{mode}}-sources.zip',
    // AMO exige des sources qui se reconstruisent. Par défaut WXT n'archive
    // que son propre dossier, d'où il manquait le `package.json` qui porte la
    // version, `injected-env-vars.json`, les fichiers `.env` dont dépendent
    // les empreintes des paquets, le binaire Yarn versionné et les trois
    // paquets partagés : la compilation ne démarrait même pas.
    sourcesRoot: envDir,
    // WXT parcourt les sources avec `**/*`, qui ne prend aucun fichier
    // caché : sans ces motifs explicites, l'archive partait sans le binaire
    // Yarn versionné ni les `.env`, et les empreintes des paquets produits
    // ne correspondaient plus. Ces fichiers-là ne portent que des valeurs
    // publiques — origines d'API, identifiants d'extension, DSN Sentry.
    includeSources: [
      '.yarnrc.yml',
      '.yarn/releases/**',
      '.env',
      '.env.staging',
      '.env.proding',
      '.env.production',
    ],
    excludeSources: [
      '.git/**',
      '.direnv/**',
      '.nx/**',
      '.yarn/cache/**',
      '.yarn/install-state.gz',
      'scratchpad/**',
      // Le site ne participe pas à la construction de l'extension, et il
      // pèse à lui seul plusieurs dizaines de méga-octets d'images.
      'packages/web/**',
      '**/.output/**',
      '**/.wxt/**',
      '**/.next/**',
      // Non versionné : ce fichier contient les réglages locaux de qui
      // développe, et n'a donc rien à faire dans une archive publique.
      '.env.development',
      '.env.development.local',
      '**/*.local',
    ],
  },
  manifest: ({ browser, mode }) => {
    const isDev = mode === 'development';
    const isStaging = mode === 'staging';
    const isProding = mode === 'proding';
    const nameSuffix = isDev
      ? ' - development'
      : isStaging
        ? ' - staging'
        : isProding
          ? ' - proding'
          : '';
    const titleSuffix = nameSuffix;

    const manifest: Record<string, unknown> = {
      name: `Dismoi${nameSuffix}`,
      description:
        'Amis, media, experts vous informent directement sur les pages web visitées.',
      version,
      permissions: ['activeTab', 'storage', 'contextMenus', 'alarms'],
      host_permissions: ['*://*/*'],
      web_accessible_resources: [
        {
          resources: ['img/*', 'fonts/*'],
          matches: ['<all_urls>'],
        },
      ],
      action: {
        default_icon: {
          '16': 'img/logo/dismoi/16x16.png',
          '48': 'img/logo/dismoi/48x48.png',
          '128': 'img/logo/dismoi/128x128.png',
        },
        default_title: `Dismoi${titleSuffix}`,
      },
      icons: {
        '16': 'img/logo/dismoi/16x16.png',
        '48': 'img/logo/dismoi/48x48.png',
        '128': 'img/logo/dismoi/128x128.png',
      },
    };

    // CSP per environment
    if (isDev) {
      manifest.content_security_policy = {
        extension_pages: "script-src 'self'; object-src 'self'",
      };
    } else if (isStaging) {
      manifest.content_security_policy = {
        extension_pages:
          "script-src 'self'; object-src 'self'; connect-src https://staging.dismoi.io https://sentry.io https://plausible.io",
      };
    } else if (isProding) {
      manifest.content_security_policy = {
        extension_pages:
          "script-src 'self'; object-src 'self'; connect-src https://api.dismoi.io https://sentry.io https://plausible.io",
      };
    } else {
      // production
      manifest.content_security_policy = {
        extension_pages:
          "script-src 'self'; object-src 'self'; connect-src https://api.dismoi.io https://sentry.io https://plausible.io",
      };
    }

    // `externally_connectable` ouvre le canal entre la page des profils et
    // l'extension. Firefox ne l'implémente pas — ni `runtime.connect` ni
    // `runtime.sendMessage` depuis une page web, cf. bogue 1319168 — et la
    // déclarer lui vaudrait un avertissement à la relecture d'AMO pour une
    // clé sans effet. La page s'y rabat sur la communication par `window`,
    // ce que `canConnectToExtension` décide déjà à l'exécution.
    if (browser !== 'firefox') {
      manifest.externally_connectable = {
        matches: isDev
          ? ['*://localhost/*']
          : ['https://*.dismoi.io/*', 'https://*.lememe.fr/*'],
        accepts_tls_channel_id: false,
      };
    }

    // Firefox-specific settings
    if (browser === 'firefox') {
      let geckoId: string;
      if (isDev) {
        geckoId = '{a5765ead-77e1-4681-85cc-f8fbe40dbb73}';
      } else if (isStaging) {
        geckoId = '{7d0d2553-c311-4acd-a170-f9a4714eb2c0}';
      } else if (isProding) {
        geckoId = '{72aad822-62f5-4663-a8f0-025b2f9a3dd5}';
      } else {
        geckoId = '@lmem';
      }
      manifest.browser_specific_settings = {
        gecko: { id: geckoId },
      };
    }

    return manifest;
  },
  vite: ({ mode, command }) => {
    const env = resolveInjectedEnv(mode, envDir);
    assertRequiredEnv(env, mode);

    return {
      build: {
        // `wxt dev` ne minifie pas ; `wxt build` si, quel que soit le mode.
        // Un artefact de développement minifié n'est pas seulement illisible :
        // Redux compare `isCrushed.name` à son propre nom pour détecter la
        // minification, et signale alors une erreur à chaque démarrage parce
        // que NODE_ENV ne vaut pas « production ». Staging et production
        // restent minifiés.
        minify: command !== 'serve' && mode !== 'development',
      },
      resolve: {
        alias: {
          // Shared packages (new canonical paths)
          '@dismoi/domain': path.resolve(__dirname, '../domain'),
          '@dismoi/ui': path.resolve(__dirname, '../ui'),
          '@dismoi/i18n': path.resolve(__dirname, '../i18n'),
          '@dismoi/extension': path.resolve(__dirname, '.'),

          // Backward-compat aliases for internal extension imports
          // (old baseUrl-relative paths that haven't been rewritten yet)
          'libs/store': path.resolve(__dirname, './store'),
          'libs/api': path.resolve(__dirname, './api-client'),
          'libs/tracking': path.resolve(__dirname, './tracking'),
          'libs/hooks': path.resolve(__dirname, './hooks'),
          'libs/webext': path.resolve(__dirname, './webext'),
          'libs/facets': path.resolve(__dirname, './facets'),
          'libs/utils': path.resolve(__dirname, './utils'),
          'app/background': path.resolve(__dirname, './background'),
          'app/content': path.resolve(__dirname, './content'),
          'app/profiles': path.resolve(__dirname, './profiles'),
          assets: path.resolve(__dirname, './assets'),
          types: path.resolve(__dirname, './types'),
          utils: path.resolve(__dirname, './utils'),
          test: path.resolve(__dirname, './test'),
        },
      },
      define: {
        // Inject all known env vars (undefined if not set at build time)
        ...Object.fromEntries(
          INJECTED_ENV_VARS.map((name) => [
            `process.env.${name}`,
            env[name] !== undefined ? JSON.stringify(env[name]) : 'undefined',
          ]),
        ),
        'process.env.APP_VERSION': JSON.stringify(version),
        // `NODE_ENV` ne figure pas parmi les variables injectées : le repli
        // ci-dessous le réduisait à `undefined`, et tout le code qui teste
        // `!== 'production'` prenait la branche de développement jusque dans
        // un paquet publié — journal Redux déversé dans la console des
        // utilisateurs, contrôle d'immuabilité exécuté à chaque action, titre
        // d'extension « DisMoi - undefined », et des rapports Sentry sans
        // environnement ni version. Le mode de compilation porte exactement
        // la même valeur que l'ancien NODE_ENV de webpack : staging et
        // proding gardent donc leurs outils de développement.
        'process.env.NODE_ENV': JSON.stringify(mode),
        // Catch-all fallback for any remaining process.env references
        // (e.g. styled-components internals, debug libs)
        'process.env': '{}',
      },
      plugins: [
        {
          name: 'shim-module-global',
          renderChunk(code) {
            if (code.includes('module')) {
              return 'if(typeof module==="undefined"){var module={};}\n' + code;
            }
            return null;
          },
        },
      ],
    };
  },
});
