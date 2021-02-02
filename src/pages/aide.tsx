import React from 'react';
import ContentPage from '../next_components/content_page';

const pageText = `
# Aide

## Questions fréquentes

### Fonctionnement de l’extension

- [L’extension Dismoi peut-elle ralentir ma navigation ?](/)
- Vie privée : quelles garanties ? 
- Sur quelles pages les contributions apparaissent-elles ?

### Problèmes rencontrés avec l’extension
1. « J’ai beau testé, les informations censées s’afficher n’apparaissent pas »
1. Désinstaller l’extension Dismoi
1. Réactiver Dismoi sous Chrome

### Le projet
- Les dernières évolutions sur Chrome et Firefox
- Comment le projet se finance-t-il ?
- Points communs et différences avec Twitter et Facebook

## Vous ne trouvez pas la réponse à votre question ?

Merci de nous contacter via le formulaire de contact
ou bien par mail à support /_at_/ dismoi.io
`;

function Page() {
  return <ContentPage title="Aide" content={pageText} path="/aide" />;
}

export default Page;
