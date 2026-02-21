import { defineConfig } from 'wxt';
import path from 'path';
import { version } from './package.json';

const envVarsToInject = [
  'WEBSITE_URL',
  'SENTRY_DSN',
  'BACKEND_ORIGIN',
  'UNINSTALL_ORIGIN',
  'REFRESH_MC_INTERVAL',
  'REFRESH_CONTRIBUTORS_INTERVAL',
  'TRACKING_BACKEND',
  'PLAUSIBLE_DOMAIN',
  'PLAUSIBLE_API_URL',
  'SENTRY_ENABLED',
  'PLATFORM',
  'CHROME_EXTENSION_ID',
  'FIREFOX_EXTENSION_ID',
  'CHROME_STORE_URL',
  'FIREFOX_STORE_URL',
  'PROFILES_ORIGIN',
  'ACCESSIBLE_CONTRIBUTORS_IDS',
  'PRESELECTED_CONTRIBUTORS_IDS',
];

export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-react'],
  manifest: ({ browser, mode }) => {
    const isDev = mode === 'development';
    const isStaging = mode === 'staging';
    const isProding = mode === 'proding';
    const nameSuffix = isDev ? ' - development' : isStaging ? ' - staging' : isProding ? ' - proding' : '';
    const titleSuffix = nameSuffix;

    const manifest: Record<string, unknown> = {
      name: `Dismoi${nameSuffix}`,
      description: 'Amis, media, experts vous informent directement sur les pages web visitées.',
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

    // externally_connectable per environment
    if (isDev) {
      manifest.externally_connectable = {
        matches: ['*://localhost/*'],
        accepts_tls_channel_id: false,
      };
    } else if (!isDev) {
      manifest.externally_connectable = {
        matches: ['https://*.dismoi.io/*', 'https://*.lememe.fr/*'],
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
  vite: () => ({
    resolve: {
      alias: {
        libs: path.resolve(__dirname, 'src/libs'),
        types: path.resolve(__dirname, 'src/types'),
        components: path.resolve(__dirname, 'src/components'),
        app: path.resolve(__dirname, 'src/app'),
        assets: path.resolve(__dirname, 'src/assets'),
        utils: path.resolve(__dirname, 'src/utils'),
        test: path.resolve(__dirname, 'test'),
      },
    },
    define: {
      // Inject all known env vars (undefined if not set at build time)
      ...Object.fromEntries(
        envVarsToInject.map((key) => [
          `process.env.${key}`,
          process.env[key] !== undefined
            ? JSON.stringify(process.env[key])
            : 'undefined',
        ])
      ),
      'process.env.APP_VERSION': JSON.stringify(version),
      // Catch-all fallback for any remaining process.env references
      // (e.g. styled-components internals, debug libs)
      'process.env': '{}',
    },
    plugins: [
      {
        name: 'shim-module-global',
        // WORKAROUND: styled-components v5 accesses the global `module` for
        // HMR detection, which doesn't exist in content scripts or service
        // workers. This shim can be removed after upgrading to
        // styled-components v6+ where this check was removed.
        // See: https://github.com/styled-components/styled-components/issues/4096
        renderChunk(code) {
          if (code.includes('module')) {
            return 'if(typeof module==="undefined"){var module={};}\n' + code;
          }
          return null;
        },
      },
    ],
  }),
});
