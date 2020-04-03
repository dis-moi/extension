# Dismoi - extension

[![Build Status](https://semaphoreci.com/api/v1/projects/02861938-a833-4f0e-938d-9bb2cd5ae49f/965692/shields_badge.svg)](https://semaphoreci.com/lmem/extension)

> _Dis moi_ means _Tell me_ in :fr: French.

**Dismoi** is a web extension empowering anyone to post additional information on a web page.
When you follow someone, its information will show up when you visit the commented web page.

To lean more about the uses cases, visits the :fr: [**Dismoi** website](https://www.dismoi.io/).

> At the time of writing, information are stored in database and exposed via the [**Dismoi** Backend](https://github.com/dis-moi/backend).

## Installation

You can find the latest _tests_ version of **Dismoi** extension on the [releases page](https://github.com/dis-moi/extension/releases).

For the latest production version of **Dismoi** extension visit the official addon page of you favorite browser:

- [**Dismoi** Firefox](https://addons.mozilla.org/fr/firefox/addon/dismoi/)
- [**Dismoi** Chrom\*](https://chrome.google.com/webstore/detail/bulles/fpjlnlnbacohacebkadbbjebbipcknbg)

## Permissions

The **Dismoi** extension requires the following permissions :

- `activeTab` The extension is able to follow your navigation on the active tab, when you browse to a new `URL` you may receive a new information.
- `storage` The extension use the [`sync` storage area](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/sync) to store and sync across browser instance the following informations :
  - `prefs` The contributions you dismissed, disliked, liked, read. Also if you accepted the :fr: [Term of Service](https://www.dismoi.io/cgu/).
  - `subscriptions` Which contributors you are following.
  - `installationDetails` The extension version, date of installation, date of last update.
  - `user` A generated unique identifier.
  - `serviceMessage` The last time you saw the service message, to avoid showing it up again.
- `matches: ['*://*/*']` To _potentially_ notify you on any page you are visiting.
  > In the near future we wan't to use the [declarative content API](https://developer.chrome.com/extensions/declarativeContent), to avoid injecting Js everywhere and further protect your private life (see #275).

## Development

1. Clone the repository

```bash
git clone git@github.com:dis-moi/extension.git dismoi-extension
```

2. Install [yarn](https://yarnpkg.com/)

> https://classic.yarnpkg.com/en/docs/install

3. Install dependencies

```bash
yarn
```

4. Create a copy of `.env.development.example` to `.env.development` and adjust the values.

> Read further on [environments](docs/CONTRIBUTING.md#Environments).

5. Start the extension

```bash
yarn start
```

> Watch files changes (but do not reload the content script though)

6. Open [chrome://extensions/](chrome://extensions/),
   - activate **Developer mode**
   - click **Load unpacked**
   - and load `build/development/chromium` folder

> Chrom(e|ium) browser is recommend for development.
> see https://developer.chrome.com/extensions/getstarted#manifest

For further reading, refer to the [**Dismoi** contributing guidelines](docs/CONTRIBUTING.md).

## Test

```bash
# test everything
yarn test
```

> For integration tests see https://github.com/dis-moi/extension/pull/289

## Storybook

There is a Storybook for [**Dismoi** components](https://storybook.lmem.net) design, exploration, testing and documentation. It's hot reloaded.
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
