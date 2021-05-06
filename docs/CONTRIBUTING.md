# Contributing guidelines

First off, thank you for considering contributing to Dismoi. Dismoi is a community of great people like you, dedicated to bring the best information to others.

## Code of conduct

Take note of the [code of conduct](CODE_OF_CONDUCT.md).

## Lang

Most members of the team do speak :fr: **French** but not all as their mother tongue.
Since the team is international, we use :gb: **English** as the default lang in code, docs, issues, etc.

> For extension __i18n__ strategy see [I18N.md](I18N.md) :fr:

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report. Following these guidelines helps maintainers and the community understand your report :pencil:, reproduce the behavior :computer: :computer:, and find related reports :mag_right:.

#### How Do I Submit A (Good) Bug Report?

Explain the problem and include additional details to help maintainers reproduce the problem:

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps which reproduce the problem** in as many details as possible.
- **Provide specific examples to demonstrate the steps**.

Provide more context by answering these questions:

### Suggesting Enhancements

#### How Do I Submit A (Good) Enhancement Suggestion?

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
- **Provide specific examples to demonstrate the steps**.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
- **Explain why this enhancement would be useful** to most users.

### Your First Code Contribution

Unsure where to begin contributing ? You can start by looking through these [Help wanted issues][help-wanted] issues.

### Pull Requests

The process described here has several goals:

- Improve or at least maintain the quality
- Fix problems that are important to users
- Enable a sustainable system for maintainers to review contributions

After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing <details><summary>What if the status checks are failing?</summary>If a status check is failing, and you believe that the failure is unrelated to your change, please leave a comment on the pull request explaining why you believe the failure is unrelated. A maintainer will re-run the status check for you. If we conclude that the failure was a false positive, then we will open an issue to track that problem with our status check suite.</details>

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Structure

This code base consists in a set of 3 apps, written in `typescript`, forming together a larger app, the **Dismoi** browser extension.

### Directory structure

You should respect the following **directory structure**:

- `src/`
  - `api/` APIs related code ([Dismoi backend](https://github.com/dis-moi/backend), [sendinblue](https://fr.sendinblue.com/), ...)
  - `app/` apps and commons
      - `background/` an app maintaining the long-term state (see [background script](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/background) on the mdn)
      - `profiles/` a `react` app managing subscriptions
      - `content/` a `react` app injected in the web pages
      - `lmem/` all _domain_ related code
  - `assets/` fonts, images, etc.
  - `components/` components library, organised with the [atomic design methodology](https://atomicdesign.bradfrost.com/)
  - `webext/` all **web extension** related code
- `manifest/` base and environment specific web-extension manifests
- `test/` `@deprecated` _prefer using a `_.spec.ts` in the same directory of the tested file\*
  - `app/` for Redux actions and reducers, and for React components (using [enzyme](http://airbnb.io/enzyme/)).
  - `integration/` runtime tests for built web-extensions.

## Conventions

### Code style

You can lint both TypeScript and CSS by running:

```bash
yarn lint
```

#### Typescript

Code style rules are available in [`.eslintrc.json`](.eslintrc.json).

You can manually lint `*.ts` files by running the following command:

```bash
yarn lint:ts
```

### Styles

Component are written with [`styled-components`](https://styled-components.com/).

> Styling rules are available in `.stylelintrc`.

You can manually lint the styled components by running the following command:

```bash
yarn lint:css
```

For each new `Component.ts` a new `Component.story.ts` should be added.

### Commits

We follow [conventional commits](https://conventionalcommits.org/) since version 1.0.0 and
we use [Semantic Release](https://github.com/semantic-release/semantic-release) to build and publish new releases.

> The **feat** flag, in the commit, forces `semantic-release`, to increment the minor version number of the future production release.

## Sentry

`SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_DSN` and `SENTRY_ENABLED` are committed in staging and production .env file because they are no secret, and we know the values we want to use depending on the environment.

Env var `SENTRY_SEND_VERSION` is not defined in any .env file but forced by npm script when using `buildVersion` instead of `build` script, thus triggering the upload of the built version to Sentry service.

Such operation (that you should not have to run on your machine) does need a .sentryclirc file with the user `token` to complete:

```
[auth]
token=4d786d88c7d9436282c35b4eb82ae2dfeaff5ee296e3404ba3654ab62c151b73
```

> **Note:** You'll find your token here https://sentry.io/settings/account/api/auth-tokens/

### Redux DevTools

We use [Redux DevTools](https://extension.remotedev.io/) to inspect Redux actions and state changes.
Once installed, from the Redux DevTools extension’s context menu, choose “Open Remote DevTools” for remote monitoring.

## Environments

Environment variables are taken from multiple `.env` files.

From highest to lowest priority:

- `.env.${NODE_ENV}.local`
- `.env.${NODE_ENV}`
- `.env.local`
- `.env`

In development you should create a copy of `.env.development.example` to `.env.development` and adjust the values.
To run automation, create a copy of `.env.example` to `.env` and adjust values.

> **Note:** The test environment ignores local files.

> **Note 2:** This configuration was inspired by [Parcel](https://parceljs.org/env.html#%F0%9F%8C%B3-variables-d'environnement)

List of environments:

- `staging` : staging extension on `staging` API
- `proding` : staging extension on `production` API
- `production`: production ready extension on `production` API

## Build

To build all production packages (Chromium, Firefox, etc).

```bash
# build files to './build/{browser}/'
yarn build:production
```

You can build any variations of the extension by playing with environment variables and this `webpack` command:

```
NODE_ENV=production|proding|staging webpack --mode=production --env.PLATFORM=firefox|chromium --env.SENTRY_ENABLED
```

## Deployment

> For each `feature`, `fix`, etc... we create a new branch and then a PR with `master` as the target branch.

Once the PR is merged into `master` a build is triggered on [SemaphoreCI](https://semaphoreci.com/lmem/extension/)

> see [build configuration](https://semaphoreci.com/lmem/extension/settings)

## Version release

Once the build passes, an automatic `semantic-release` script is triggered.
Roughly, this deploy process bumps the version number in `package.json` and build each packages for each **platform** and each **environment**:

Once built each package is released on [Github](https://github.com/insitu-project/recommendations-webextension/releases) and on Firefox store as `unlisted` version (not Chrome because the publication on the Chrome store may take a while -- days -- to be validated).

> See the detailed deploy steps `./release.config.js` in project root directory.

## Chrome store releases & Firefox Production

These deployments process are manual, and are triggered from `Semaphore` once the staging has been functionally validated.

Deploy scripts:

- Firefox production: `yarn buildVersion:firefox:production && yarn upload:firefox:production`
- Chromium staging: `yarn buildVersion:chromium:staging && yarn upload:chromium:staging`
- Chromium proding: `yarn buildVersion:chromium:proding && yarn upload:chromium:proding`
- Chromium production: `yarn buildVersion:chromium:production && yarn upload:chromium:production`

Make you sure have access to semaphore and wait until the last master built is completed with success:
https://semaphoreci.com/lmem/extension/branches/master

- Then click on the last master build and click "Deploy manually".
- Tick one of the `Firefox: Production`, `Chromium: Staging & Proding`, `Chromium: Production`, checkboxes

### Chrome webstore

[chrome webstore](https://chrome.google.com/u/1/webstore/devconsole/g10525161170329704473?hl=fr) account:

```
extensions.lmem@gmail.com
```

> Ask for the password from a super user! _OR_ A super user may add your own google account to the developer group.

To generate your own tokens and deploy from your local environment :
https://github.com/DrewML/chrome-webstore-upload/blob/master/How%20to%20generate%20Google%20API%20keys.md

### Firefox Addons

#### Submit Addon to Firefox Production

> [Developer Hub](https://addons.mozilla.org/en-US/developers/addons) 
>
> infrastructure@dismoi.io

In order for the Mozilla review to complete successfully, please the following steps :

1. Use [SemaphoreCI](https://semaphoreci.com/lmem/extension/) to deploy to `Firefox production`
2. [Download](https://github.com/dis-moi/extension/releases) the source code archive of the version you want to deploy to production extension (`Source code (tar.gz)`)
3. *Once version is available* in [Developer Hub](https://addons.mozilla.org/en-US/developers/addon/dismoi/versions), click on the version number, and upload the `tar.gz` in `Source code` field.

> There are still issues at **Mozilla**  preventing us to upload the source code automatically.
> - https://github.com/mozilla/addons-server/issues/9913 
> - https://github.com/mozilla/sign-addon/issues/409
