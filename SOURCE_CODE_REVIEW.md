# Building this add-on from source

This archive contains everything needed to reproduce the submitted package.
The build is deterministic: following the steps below produces files that are
byte-for-byte identical to the uploaded add-on.

## What this add-on does

DisMoi lets people follow contributors who publish contextual notices about the
web pages they visit. The background script holds a Redux store, a content
script injects the notice UI into pages, and a standalone React page lists the
contributors.

## Requirements

- **Node.js 22** (see `engines` in `package.json`)
- No global package manager install needed: Yarn 4.6.0 ships with the sources,
  at `.yarn/releases/yarn-4.6.0.cjs`.

## Build

From the root of this archive:

```sh
corepack enable          # makes the bundled Yarn 4.6.0 available as `yarn`
yarn install
cd packages/extension
yarn wxt build -b firefox
```

The unpacked add-on is written to `packages/extension/.output/firefox-mv3/`.
Compare that directory with the submitted package.

To produce the ZIP instead:

```sh
yarn zip:production      # from the archive root; writes to packages/extension/.output/
```

## Notes for the reviewer

- **Build tool.** [WXT](https://wxt.dev) 0.20 over Vite. It generates
  `manifest.json` from `packages/extension/wxt.config.ts`; there is no
  hand-written manifest in the sources.
- **`.env` files are part of the build.** `.env` and `.env.production` hold the
  API origin, the store identifiers and the Sentry DSN — all public values.
  They are included because the bundler inlines them, so removing them would
  change the output and break reproducibility. No credentials are in this
  archive.
- **Workspace layout.** The add-on lives in `packages/extension` and imports
  three sibling packages: `packages/domain` (business types),
  `packages/ui` (React components) and `packages/i18n` (translations). All
  three are included.
- **The website is not included.** `packages/web` is a separate Next.js
  application that plays no part in building the add-on.
- **Minification.** Production builds are minified by Vite's default
  (esbuild). Run the commands above to obtain readable, matching output.

## Tests

```sh
yarn test
```
