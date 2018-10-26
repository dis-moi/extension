/**
 * It happened in the past that invalid recommendation object result in broken UI
 * https://github.com/insitu-project/proto-ext/issues/85
 * This was due to the server sending back objects with missing fields
 * This function validates the object at runtime to decide what to do before the 
 * object gets sent to the UI.
 */

/*

const reco = {
  title: 'Il y a mieux que le Samsung Galaxy S6',
  description: 'Que vous ayez un usage basique, avancé, professionnel [...]',
  contributor: {
    name: 'Maarten Samson',
  },
  // criteria: [
  //   {
  //     slug: 'health',
  //     label: 'Santé',
  //   },
  // ],
  resource: {
    // author: 'Boby',
    url: 'http://choisir.lmem.net/samsung-galaxy-s6',
    label: 'Lire le comparatif',
    editor: {
      id: 6
      label: 'Le Gorafi',
      url: 'http://legorafi.fr',
    },
  },
  // alternatives: [
  //   {
  //     url_to_redirect: 'http://choisir.lmem.net/samsung-galaxy-s6',
  //     label: 'Voir l’alternative',
  //   },
  // ],
};

*/


export default function (reco){
  if(Object(reco) !== reco) return false;

  const {
    contributor, title, description, resource, criteria, alternatives 
  } = reco;

  return (

    typeof title === 'string'
    && typeof description === 'string'

    && Object(resource) === resource
    && typeof resource.label === 'string'
    && typeof resource.url === 'string'

    && (!resource.author || typeof resource.author === 'string')

    && Object(resource.editor) === resource.editor
    && typeof resource.editor.label === 'string'
    && typeof resource.editor.url === 'string'

    && Object(contributor) === contributor
    && typeof contributor.name === 'string'

    && (!criteria || (Array.isArray(criteria) && criteria.every(criterion => (
      Object(criterion) === criterion
      && typeof criterion.label === 'string'
      && typeof criterion.slug === 'string'
    ))))

    && (!alternatives || (Array.isArray(alternatives) && alternatives.every(alternative => (
      Object(alternative) === alternative
      && typeof alternative.label === 'string'
      && typeof alternative.url_to_redirect === 'string'
    ))))

  );
}