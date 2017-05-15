# Le Même en Mieux - Recommendations

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

```bash
# required node.js/io.js (>= 6)
# clone it
npm install
```

## Development

```bash
# build files to './build/dev/'
# watch files change (do not reload the extension though)
# start WebpackDevServer
npm start
```

- [Load unpacked extension's `./build/dev/` folder to Chrome.](https://developer.chrome.com/extensions/getstarted#unpacked)

#### Debug with Redux DevTools

We use [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension), install it from [Chrome store](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) for debugging.


## Build Web extension

### Production

To build a Chrome package...

```bash
# build files to './build/production/'
npm run build:production
```

To buid a **Firefox** package...

```bash
# build files to './build/firefox/'
npm run build:firefox
```

### Staging

```bash
# build files to './build/staging/'
npm run build:staging
```

### Development

```bash
# build files to './build/dev/'
npm run build:dev
```

## Deploy Chrome extension to SFTP server

**CAUTION: deployments are operated by SemaphoreCI. Therefore, you SHOULD NOT perform any deployment on your own.**

The Testing channel is updated automatically on any push to the develop branch. 
The Stable channel is manually ignited from the master branch.

### Set up your SSH keys

First, set up your public ssh key on the SFTP server.
Then, create a `.ftppass` config file as follow (using your own values,
see [gulp-sftp](https://github.com/gtg092x/gulp-sftp) for details):

```json
{
  "keyMain": {
    "agent": "/run/user/1001/keyring/ssh",
    "user": "jdoe",
    "keyLocation": "/home/jdoe/.ssh/dev-rsa"
  }
}
```

Hint: to get the path of your ssh-agent’s socket,
try something like `echo $SSH_AUTH_SOCK`.

### Deploy

```bash
# deploys files from './build/production' to the SFTP server
npm run deploy:production
```

Or `npm run deploy:staging` for staging deployment.

## Test

```bash
# test everything
npm test
```

### Integration tests

Inspect the extension _background_ to get its console and run `window.integrationTest()`.

## LICENSE

[GNU GPL v3](LICENSE)

>    Le Même en Mieux est un assistant d’achat indépendant des vendeurs et des marques.
>    Copyright (C) 2016  INSITU SAS
>
>    This program is free software: you can redistribute it and/or modify
>    it under the terms of the GNU General Public License as published by
>    the Free Software Foundation, either version 3 of the License, or
>    (at your option) any later version.
>
>    This program is distributed in the hope that it will be useful,
>    but WITHOUT ANY WARRANTY; without even the implied warranty of
>    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
>    GNU General Public License for more details.
>
>    You should have received a copy of the GNU General Public License
>    along with this program.  If not, see <http://www.gnu.org/licenses/>.
