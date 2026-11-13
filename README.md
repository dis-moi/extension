# Dismoi - extension

[![Build Status](https://semaphoreci.com/api/v1/projects/02861938-a833-4f0e-938d-9bb2cd5ae49f/965692/shields_badge.svg)](https://semaphoreci.com/lmem/extension)

> _Dis moi_ means _Tell me_ in :fr: French.

**Dismoi** is a web extension that allows anyone to post information directly on any web page you browse.
If you follow an informer, his messages are displayed at the time you visit the pages he has commented on.

To learn more about the uses cases, visit the :fr: [**Dismoi** website](https://www.dismoi.io/).

> At the time of writing, information are stored in database and exposed via the [**Dismoi** Backend](https://github.com/dis-moi/backend).

## Installation

You can find the latest _tests_ version of **Dismoi** extension on the [releases page](https://github.com/dis-moi/extension/releases).

For the latest production version of **Dismoi** extension visit the official addon page of you favorite browser:

- [**Dismoi** Firefox](https://addons.mozilla.org/fr/firefox/addon/dismoi/)
- [**Dismoi** Chrom\*](https://chrome.google.com/webstore/detail/bulles/fpjlnlnbacohacebkadbbjebbipcknbg)

## Build instructions

### Firefox

> _To the attention of the **Mozilla** addon reviewer._
>
> To reach _zero diff_ with the submitted addon, the addon must be build with **node version `10.15.0`**.
>
> ```
> yarn install && NODE_ENV=production yarn build:firefox
> ```
>
> Or just run the build process with `Docker`:
>
> ```
> yarn build:firefox:production:docker
> ```
>
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

## Contributing

You’re welcome to help!

> For further reading, refer to the [**Dismoi** contributing guidelines](docs/CONTRIBUTING.md).

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

## Publication de l'extension

La publication est **manuelle**. Elle n'est pas la conséquence d'une fusion sur
`master` : envoyer une extension chez Google et Mozilla est irréversible et
déclenche un examen, ça se décide.

Depuis l'onglet **Actions → Publication → Run workflow**, ou :

```bash
gh workflow run release.yml                        # publie
gh workflow run release.yml -f simulation=true     # aperçu seul
```

Une seule exécution fait tout : `nx release` lit les commits depuis la dernière
étiquette, en déduit le numéro suivant (Conventional Commits), l'écrit dans les
manifestes et le `CHANGELOG.md`, commite, étiquette et pousse ; le workflow
construit ensuite les six archives et les soumet aux deux stores.

La case **simulation** passe `--dry-run` : Nx affiche le numéro calculé et
l'entrée de changelog sans rien écrire, et les étapes de construction et de
soumission sont sautées.

### Configuration

Tout tient dans le bloc `release` de `nx.json`. Quatre points méritent une
explication, parce qu'aucun ne se devine :

- **`projects`** liste `extension`, `domain`, `i18n` et `ui`, pas `web`. Nx ne
  retient que les commits touchant un fichier des projets du groupe — ou un
  fichier racine, et seulement si le commit n'a pas de portée
  (`shared.js:211-218`). Sans les trois bibliothèques, un `fix(ui):` ne
  déclencherait aucune version alors qu'il change l'extension. Avec `web`, une
  modification du site en déclencherait une pour rien.

- **`manifestRootsToUpdate: [".", "{projectRoot}"]`** fait écrire la version
  dans le `package.json` racine — celui que lit `wxt.config.ts` — en plus de
  celui de chaque paquet. Le jeton `{workspaceRoot}`, qui semblerait naturel,
  **ne fonctionne pas** : il vaut la chaîne vide, et `_interpolate` teste la
  valeur avec `!value[...]` (`nx/src/tasks-runner/utils.js:280`), donc le jeton
  est renvoyé littéralement. D'où le `"."`.

- **Les `package.json` des quatre paquets** n'existent que pour Nx. Ils ne
  déclarent aucune dépendance et Yarn les ignore (la racine n'a pas de champ
  `workspaces`). Nx les exige quand même : `getAllNonImplicitDependents` lit le
  manifeste de chaque dépendance du graphe, sans condition et sans que
  `updateDependents: "never"` y change quoi que ce soit.

- **`import/internal-regex` dans `.eslintrc.json`** est une conséquence des
  manifestes : dès qu'ils existent, `eslint-plugin-import` cesse de voir les
  `@dismoi/*` comme des alias de chemin et les reclasse, ce qui faisait passer
  les avertissements `import/order` de 62 à 157. Le réglage leur rend leur
  catégorie « internal ».
- **La poussée est une étape à part.** `nx release` ne sait pas pousser : la
  commande globale n'expose pas `--git-push` et `release.git` n'a pas d'option
  correspondante. Les étiquettes posées sont annotées, d'où `--follow-tags`.

> Quand aucun commit ne justifie de version, `nx release` sort en **code 1**
> après « No files would be changed ». L'exécution apparaît donc en échec, et
> les étapes suivantes — poussée, archives, soumission — sont sautées. C'est
> le comportement voulu : rien ne part. On ne masque pas ce code de retour,
> qui servirait aussi à cacher un vrai échec.
> Pour un aperçu en local, sans rien écrire :

```bash
yarn release:simulation
```

## Déploiement du site

Le site et la page des profils sont une seule application Next.js
(`packages/web`), servie par la sortie `standalone` de Next.

```bash
yarn build   # nx run web:build — compile et complète le dossier standalone
yarn start   # nx run web:start — sert le site, écoute $PORT, écoute 0.0.0.0
```

### Clever Cloud

Application de type **Node.js**. Clever installe les dépendances mais ne
compile pas : la compilation passe par un hook. Variables à déclarer sur
l'application :

La production tourne sur l'application **`dismoi-io`**
(`app_faf85108-560e-4932-a3b3-82cdc2d0c021`), qui sert `www.dismoi.io` et
`dismoi.io`. `lmel-website` est une autre application, pour `lememe.fr`.

| Variable             | Valeur                        | Pourquoi                                       |
| -------------------- | ----------------------------- | ---------------------------------------------- |
| `CC_POST_BUILD_HOOK` | `./clevercloud/post_build.sh` | Clever ne lance aucune compilation de lui-même |
| `CC_NODE_BUILD_TOOL` | `yarn-berry`                  | le dépôt est en Yarn 4 (`packageManager`)      |
| `CC_RUN_COMMAND`     | `yarn start`                  | sinon Clever démarre avec npm                  |
| `NODE_ENV`           | `production`                  | sert le rendu de production                    |

Trois variables qu'on serait tenté de poser et qu'il ne faut pas :

- **`PORT`** — « _Clever Cloud sets `PORT` to `8080` for you: don't add it to
  your environment variables or your code_ ». Le serveur l'honore déjà.
- **`CC_NODE_VERSION`** — `engines.node` du `package.json` prime jusqu'au
  1er décembre 2026, donc la variable serait ignorée aujourd'hui. Le dépôt
  déclare `">=22"` : Clever choisit librement dans cette plage, et resserrer
  `engines.node` est le seul moyen de fixer la version avant cette date.
- **`CC_NODE_DEV_DEPENDENCIES`** — « _has no effect when `CC_NODE_BUILD_TOOL`
  is set to `yarn2` or `yarn-berry`_ ». Yarn 4 installe de toute façon les
  dépendances de développement, dont `nx`, nécessaire à la compilation.

Le build tourne sur une instance dédiée (`clever scale --build-flavor XL`) :
sans elle, il s'exécute sur l'instance de service, trop petite pour ce dépôt.

Les variables du site (`BACKEND_ORIGIN`, `PROFILES_ORIGIN`…) sont lues à la
**compilation** depuis `.env.production`, versionné à la racine. Une valeur
définie dans l'environnement de l'application a la priorité, ce qui permet de
pointer une préproduction sans toucher au dépôt.

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
