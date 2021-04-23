# I18N

## Principe
Dans un but d'internationnalisation du service, l'ensemble des applications : Extensions et Profiles sont traduites en plusieurs langues.
Nous utilisons pour cela une librairie permettant de traduire nos textes dans de multiples langues mais aussi d'adapter le format des dates etc.

### Language
A l'heure actuelle deux languages sont prise en charge : Français, Anglais.
L'application est prévue pour supporter autant de langues que nécessaire.

## Librairie
Pour traduire nous utilisons la librairie [i18next](https://www.i18next.com/)
>_I18next is an internationalization-framework written in and for JavaScript. But it's much more than that._

## i18n app folder Structure
Le dossier i18n comporte l'ensemble des fichiers nécessaires à la gestion de l'internationnalisation.
Celui-ci se trouve à la racine du projet puisqu'il concerne l'ensemble des applications du repo.

```
├── src                    
│   ├── i18n
│   │   ├── index.ts        # configutation et initialisation du plugins i18next
│   │   ├── format.ts       # fonction spécifique de formatage de texte, date...
│   │   ├── ressources      # un sous dossier par langue
│   │   │   ├── en              # un fichier par app
│   │   │   │   ├── extension.json      # fichier de traduction des textes de l'extension en EN
│   │   │   │   ├── profiles.json       # fichier de traduction des textes du profiles en EN
│   │   │   ├── fr
│   │   │   │   ├── extension.json      # fichier de traduction des textes de l'extension en FR
│   │   │   │   ├── profiles.json       # fichier de traduction des textes du profiles en FR
```

## Configuration de i18next

Le fichier `index.ts` à la racine de `├── i18n` permet l'inialisation et la configuration du plugin `i18next`

###Namespace
- les traductions sont scindées en namespace (NS). Il existe 1 NS par apps
- le NS par défaut est `extension`. Sans précision autre, les fonctions de traductions de l'app pioche en premier dans les textes de `extension.json`

###Langues
- il est possible d'ajouter d'autres langues. Les languages dispos sont : `EN` et `FR`
- le language par défaut est `EN`.
    - > **si une langue n'est pas trouvée** l'anglais est affiché

## Détection de la langue

Deux méthodes de détection de langue sont utilisées

###Le paramétrage de langue du navigateur
> ce paramétrage fait foie uniquement pour l'**extension**

- Si le navigateur est en français, le français sera affiché.
- Si le navigateur est en anglais ou en tout autre langue, l'anglais sera affiché.

###L'url de la page
> ce paramétrage fait foie uniquement pour la partie **profiles**

- Si l'url commence par `/en/` l'anglais sera affiché
- Autrement le français est affiché

Et ce, quelque soit la configuration de langue du navigateur.


##Fichier de traduction

Les fichiers de traductions sont en format `JSON`.

Des objets sont utilisés et définissent les clefs de traductions et leur texte
> A key is a specific set of text that, when looked up, provides a corresponding value.

À chaque clef correspond une valeur: `"key": "value"`

Ces clefs permettent aussi d'ordonner les fichiers selon une logique prédéfinie :

###Structure du namespace extension
```json
  {
  "common": "Mot commun",
  "action": "Verbe d'action",
  "date":   "Format de date",
  "menu":   "Texte de lien",
  "form":   "Texte de formulaire",
  "error":  "Texte d'erreur",
  "faq":    "Partie FAQ de l'app",
  "notice": "Les notices / contributions",
  "view" :  "Phrase unique à certaines vues",
  "title" : "Titre de page ou section",
  "path":   "url des pages de l'extention ET de la partie profiles"
}
```
###Structure du namespace profiles
```json
  {
  "common": "Mot commun",
  "action": "Verbe d'action",
  "menu":   "Texte de lien",
  "error":  "Texte d'erreur",
  "notice": "Les notices / contributions",
  "view" :  "Phrase unique à certaines vues",
  "popin":  "Texte spécifique aux popins du site"
}
```

## Code implémentation

> **!! Aucun texte ne doit être présent dans l'application ou ses composants, tout doit être inscrit dans un des fichiers de traductions**

Pour traduire les composants, deux méthodes sont utilisés.
- fonction `t`, importé via un hook permet via des `clefs` ou (i18nKey) de retrouver le bon texte à afficher dans la bonne langue.
  Cette méthode est à utiliser en priorité.

exemple:
  ```javascript 
  const MonComposant = () => {
    const {t} = useTranslation();
  
    return <p>{t('text.a.traduire')}</p>
  }
  ```

- composant `Trans`, en plus de ce que permet la fonction `t`, il permet de prendre en compte des éléments basique de mise en page (bold, italic...)

exemple:
  ```javascript 
  const MonComposant = () => <Trans i18nKey={'text.a.traduire'}>Lorem ispum <b>dolor</b> sit amet</Trans>
  ```
