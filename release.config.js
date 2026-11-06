/**
 * Publication automatique depuis `master`.
 *
 * La version est déduite des messages de commit (Conventional Commits), puis
 * inscrite dans le `package.json` racine — d'où `wxt.config.ts` la lit pour
 * le manifeste des deux navigateurs. Les six archives sont construites avant
 * le commit de release, afin que la version publiée soit exactement celle que
 * portent les paquets attachés à la publication GitHub.
 *
 * Les secrets des stores ne figurent pas ici : `bin/submit.mjs` les laisse à
 * `wxt submit`, qui les lit dans l'environnement.
 */
const MODES = ['staging', 'proding', 'production'];

const paquets = MODES.flatMap((mode) => [
  {
    path: `packages/extension/.output/dismoi-*-${mode}-chrome.zip`,
    label: `Chrome — ${mode}`,
  },
  {
    path: `packages/extension/.output/dismoi-*-${mode}-firefox.zip`,
    label: `Firefox — ${mode}`,
  },
]);

module.exports = {
  branches: ['master'],
  plugins: [
    ['@semantic-release/commit-analyzer', { preset: 'angular' }],
    ['@semantic-release/release-notes-generator', { preset: 'angular' }],
    '@semantic-release/changelog',
    [
      '@semantic-release/exec',
      {
        prepareCmd:
          'node bin/setVersion.mjs ${nextRelease.version} && yarn zip:all',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md'],
        // `[skip ci]` évite que le commit de release relance la chaîne.
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    [
      '@semantic-release/exec',
      {
        publishCmd: MODES.map((mode) => `node bin/submit.mjs ${mode}`).join(
          ' && ',
        ),
      },
    ],
    ['@semantic-release/github', { assets: paquets }],
  ],
};
