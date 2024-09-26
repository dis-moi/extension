# Dismoi - extension

[![Build Status](https://semaphoreci.com/api/v1/projects/02861938-a833-4f0e-938d-9bb2cd5ae49f/965692/shields_badge.svg)](https://semaphoreci.com/lmem/extension)

> _Dis moi_ means _Tell me_ in :fr: French.

**Dismoi** is a web extension that allows anyone to post information directly on any web page you browse.
If you follow an informer, his messages are displayed at the time you visit the pages he has commented on.

To learn more about the uses cases, visit the :fr: [**Dismoi** website](https://www.dismoi.io/).

> At the time of writing, information are stored in database and exposed via the [**Dismoi** Backend](https://github.com/dis-moi/backend).

## Common Use Cases for Dismoi

Dismoi can be used in a variety of ways to enhance your browsing experience. Here are some examples:

1. **Fact-Checking Websites**: Follow trusted informers who fact-check articles. When you visit a website with questionable information, Dismoi will show you their comments and corrections.

2. **Product Reviews**: Use Dismoi to leave reviews or notes on product pages. Share your experience directly on shopping sites and help others make informed decisions.

3. **Collaborative Research**: Dismoi is useful for group research projects. Informers can leave comments on research websites, academic papers, or articles, and share insights with other members of the team.

4. **News Commentary**: Follow journalists or bloggers who provide context or commentary on current events. You’ll see their thoughts on news articles directly while browsing.

## User Onboarding Guide

Follow these steps to get started with Dismoi:

1. **Install the Extension**:
   - [Firefox Add-on](https://addons.mozilla.org/firefox/addon/dismoi)
   - [Chrome Add-on](https://chrome.google.com/webstore/detail/dismoi)

2. **Create Your Account**:
   - After installation, create an account or log in directly from the extension popup.

3. **Start Browsing**:
   - As you browse websites, you will receive notifications from informers you follow.
   - You can add comments to any web page by clicking on the Dismoi icon in your browser toolbar.

4. **Follow Informers**:
   - Visit the Dismoi website and subscribe to informers who match your interests. Their comments will appear when you visit pages they’ve commented on.


## Installation

You can find the latest _tests_ version of **Dismoi** extension on the [releases page](https://github.com/dis-moi/extension/releases).

For the latest production version of **Dismoi** extension visit the official addon page of you favorite browser:

- [**Dismoi** Firefox](https://addons.mozilla.org/fr/firefox/addon/dismoi/)
- [**Dismoi** Chrom\*](https://chrome.google.com/webstore/detail/bulles/fpjlnlnbacohacebkadbbjebbipcknbg)

## Build instructions

### Firefox
> *To the attention of the __Mozilla__ addon reviewer.*
> 
> To reach *zero diff* with the submitted addon, the addon must be build with __node version `10.15.0`__.
> ``` 
> yarn install && NODE_ENV=production yarn build:firefox
> ```
> Or just run the build process with `Docker`:
> ```
> yarn build:firefox:production:docker
> ```
> https://extensionworkshop.com/documentation/publish/source-code-submission/

## Permissions

The **Dismoi** extension requires the following permissions :

- `activeTab` The extension is able to follow your navigation on the active tab, when you browse to a new `URL` you may receive a new information.
- `storage` The extension use the [`sync` storage area](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/sync) to store and sync across browser instance the following informations :
  - `prefs` The contributions you dismissed, disliked, liked, read. Also if you accepted the :fr: [Term of Service](https://www.dismoi.io/cgu/).
  - `subscriptions` Which informers you are following.
  - `installationDetails` The extension version, date of installation, date of last update.
  - `user` A generated unique identifier.
  - `serviceMessage` The last time you saw the service message, to avoid showing it up again.
- `matches: ['*://*/*']` To _potentially_ notify you on any page you are visiting.
  > In the near future we wan't to use the [declarative content API](https://developer.chrome.com/extensions/declarativeContent), to avoid injecting Js everywhere and further protect your private life (see #275).


## Permissions Explained

The Dismoi extension requires these permissions to function properly:

- **activeTab**: Allows the extension to detect when you navigate to a new page and show relevant messages from informers.
- **storage**: Stores your preferences and settings (such as liked or dismissed messages, accepted terms of service) and syncs them across browser instances.
- **matches: ['*://*/*']**: Enables notifications on any page you visit where informers have posted comments.

## Contributing

You’re welcome to help!

> For further reading, refer to the [**Dismoi** contributing guidelines](docs/CONTRIBUTING.md).

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

> To start the `profiles` app in development run the following command
>
> ```
> yarn start:profiles
> ```

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

## Troubleshooting

Here are solutions to common issues you might encounter:

- **Issue**: The extension isn’t showing comments from informers.
  - **Solution**: Make sure you are logged in and have subscribed to informers. Refresh the page to see if new messages appear.

- **Issue**: Permissions request popup keeps showing.
  - **Solution**: Ensure that you’ve accepted all permissions requested by the extension. Try reinstalling the extension if the issue persists.

- **Issue**: The extension isn’t loading in Chrome/Firefox.
  - **Solution**: Go to `chrome://extensions/` (Chrome) or `about:addons` (Firefox), disable and re-enable the Dismoi extension.


## Links

- 🌐 Web: https://www.dismoi.io
- 🐦 Twitter: https://twitter.com/DisMoiCompagnon

## LICENSE

[GNU AGPL V3](LICENSE)

> Copyright (C) 2016-2024 ALTERNATIVES NGO
>
> This program is free software: you can redistribute it and/or modify
> it under the terms of the GNU Affero General Public License as published by
> the Free Software Foundation, either version 3 of the License, or
> (at your option) any later version.
>
> This program is distributed in the hope that it will be useful,
> but WITHOUT ANY WARRANTY; without even the implied warranty of
> MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the 
> GNU AFFERO GENERAL PUBLIC LICENSE for more details.
>
> You should have received a copy of the GNU General Public License
> along with this program. If not, see <http://www.gnu.org/licenses/>.

