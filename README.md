# Bulle.io - Web Extension

[![Build Status](https://semaphoreci.com/api/v1/projects/02861938-a833-4f0e-938d-9bb2cd5ae49f/965710/shields_badge.svg)](https://semaphoreci.com/bmenant_lmem/extension)

At its early stages, this software was a fork of [Crossbuilder](https://github.com/zalmoxisus/crossbuilder).
However, the software has evolved to better embrace our project needs and specificities.
As a result, the upstream codebase haven’t be merged for a while and it is unlikely to happen ever again.

## Structure

- `src/app/`: React application (will be imported in the apps bellow).
- `src/assets/`: web app fonts, images, etc.
- `src/lib/`: external _non npm_ modules.
- `manifest/`: base and environment specific web-extension manifests.
- `test/app/`: tests for Redux actions and reducers, and for React components (using [enzyme](http://airbnb.io/enzyme/)).
- `test/integration/`: runtime tests for built web-extensions.

## Installation

First install [yarn](https://yarnpkg.com/) and [nvm](https://github.com/creationix/nvm) (optional).

```bash
# git clone...
nvm use lts/carbon
yarn
```

### Sentry

To configure Sentry error reporting, you should create a `.sentryclirc` file at the root of the project directory:

```
[defaults]
project=web-extension
org=lmem

[auth]
token=4d786d88c7d9436282c35b4eb82ae2dfeaff5ee296e3404ba3654ab62c151b73
```

> **Note 1:** You'll find your token here https://sentry.io/settings/account/api/auth-tokens/

> **Note 2:** If you ever need to change the Sentry DSN go to `./webpack/config.plugins.js`.

## Environments

You'll find a bunch of env variables defined in `./webpack/config.plugins.js`.

## Development

```bash
# watch files change (do not reload the extension though)
# start Webpack Dev Server
yarn start
```

- [Load unpacked extension's `./build/dev/` folder to Chrome.](https://developer.chrome.com/extensions/getstarted#unpacked)

## Storybook

There is a Storybook for components design, exploration, testing and documentation. It's hot reloaded.
Storybook may be run with the following command:

```bash
yarn storybook
```

It also possible to build a static version, the one you can see here : https://storybook.lmem.net.

You can do this with:

```bash
yarn build-storybook
```

It is automatically deployed to https://storybook.lmem.net on every `develop` branch update.

### Conventional Commits

We follow [conventional commits](https://conventionalcommits.org/) since version 1.0.0 and
we use [Semantic Release](https://github.com/semantic-release/semantic-release) to build and publish new releases.

### Redux DevTools

We use [Redux DevTools](https://extension.remotedev.io/) to inspect Redux actions and state changes.
Once installed, from the Redux DevTools extension’s context menu, choose “Open Remote DevTools” for remote monitoring.

## Build Web extension

### Production

To build all production packages (Chromium, Firefox, etc).

```bash
# build files to './build/{browser}/'
yarn build:production
```

### Staging

To build a staging package...

```bash
# build files to './build/staging/'
yarn build:staging
```

### Development

```bash
# build files to './build/dev/'
yarn build:dev
```

## Test

```bash
# test everything
yarn test
```

## Lint

You can lint both TypeScript and CSS by running:

```bash
yarn lint
```

### TypeScript

Code style rules are available in `tslint.json`.

You can manually lint .ts files running the following command:

```bash
yarn lint:ts
```

### Styles

Styling rules are available in `.stylelintrc`.

You can manually the styled components running the following command:

```bash
yarn lint:css
```

### Integration tests

Inspect the extension _background_ to get its console and run `window.integrationTest()`.

## LICENSE

[GNU GPL v3](LICENSE)

> Le Même en Mieux est un assistant d’achat indépendant des vendeurs et des marques.
> Copyright (C) 2016 INSITU SAS
>
> This program is free software: you can redistribute it and/or modify
> it under the terms of the GNU General Public License as published by
> the Free Software Foundation, either version 3 of the License, or
> (at your option) any later version.
>
> This program is distributed in the hope that it will be useful,
> but WITHOUT ANY WARRANTY; without even the implied warranty of
> MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
> GNU General Public License for more details.
>
> You should have received a copy of the GNU General Public License
> along with this program. If not, see <http://www.gnu.org/licenses/>.
