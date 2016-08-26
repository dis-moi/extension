export default function (recoURLs) {
  console.warn('Fake data. Perform the actual HTTP requests when backend is ready');
  return Promise.resolve([
    {
      contributor: {
        image: 'https://lmem-craft-backend.cleverapps.io/uploads/avatars/photo-Maarten-pr-profil.jpg',
        name: 'Maarten Samson',
        organization: 'Le Même en Mieux',
      },

      visibility: 'public',

      title: 'Il y a mieux que le Samsung Galaxy S6',

      filters: [
        {
          label: 'health',
          description: 'Santé',
        }
      ],

      description: 'Que vous ayez un usage basique, avancé, professionnel, geek, joueur régulier ou même photographe amateur, il existe de meilleurs smartpthones en termes de qualité/prix, santé et éthique de la marque.',

      alternatives: [
        {
          url_to_redirect: 'http://choisir.lmem.net/samsung-galaxy-s6-qualite-sante-ethique-les-meilleures-alternatives/',
          label: 'Voir le comparatif',
        },
      ]
    }
  ]);

  /* return Promise.all(
    recoURLs.map(u => fetch(u).then(resp => resp.json()))
  )
  .then((...recoss) => [].concat(...recoss));*/
}