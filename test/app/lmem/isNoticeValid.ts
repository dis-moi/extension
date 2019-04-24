import chai from 'chai';
import { isNoticeValid } from '../../../src/app/lmem/notice';

const expect = chai.expect;

describe('isNoticeValid', function() {
  it('Object with missing contributor is not valid', () => {
    const reco = {
      title: 'Il y a mieux que le Samsung Galaxy S6',
      description:
        'Que vous ayez un usage basique, avancé, professionnel [...]',
      // contributor: {
      //   name: 'Maarten Samson',
      // },
      criteria: [
        {
          slug: 'health',
          label: 'Santé'
        }
      ],
      resource: {
        author: 'Boby',
        url: 'http://choisir.lmem.net/samsung-galaxy-s6',
        label: 'Lire le comparatif',
        editor: {
          label: 'Le Gorafi',
          url: 'http://legorafi.fr'
        }
      },
      alternatives: [
        {
          url_to_redirect: 'http://choisir.lmem.net/samsung-galaxy-s6',
          label: 'Voir l’alternative'
        }
      ]
    };

    expect(isNoticeValid(reco)).to.be.false;
  });

  it('Object with missing title is not valid', () => {
    const reco = {
      // title: 'Il y a mieux que le Samsung Galaxy S6',
      description:
        'Que vous ayez un usage basique, avancé, professionnel [...]',
      contributor: {
        name: 'Maarten Samson'
      },
      criteria: [
        {
          slug: 'health',
          label: 'Santé'
        }
      ],
      resource: {
        author: 'Boby',
        url: 'http://choisir.lmem.net/samsung-galaxy-s6',
        label: 'Lire le comparatif',
        editor: {
          label: 'Le Gorafi',
          url: 'http://legorafi.fr'
        }
      },
      alternatives: [
        {
          url_to_redirect: 'http://choisir.lmem.net/samsung-galaxy-s6',
          label: 'Voir l’alternative'
        }
      ]
    };

    expect(isNoticeValid(reco)).to.be.false;
  });

  it('Object with missing description is not valid', () => {
    const reco = {
      title: 'Il y a mieux que le Samsung Galaxy S6',
      // description: 'Que vous ayez un usage basique, avancé, professionnel [...]',
      contributor: {
        name: 'Maarten Samson'
      },
      criteria: [
        {
          slug: 'health',
          label: 'Santé'
        }
      ],
      resource: {
        author: 'Boby',
        url: 'http://choisir.lmem.net/samsung-galaxy-s6',
        label: 'Lire le comparatif',
        editor: {
          label: 'Le Gorafi',
          url: 'http://legorafi.fr'
        }
      },
      alternatives: [
        {
          url_to_redirect: 'http://choisir.lmem.net/samsung-galaxy-s6',
          label: 'Voir l’alternative'
        }
      ]
    };

    expect(isNoticeValid(reco)).to.be.false;
  });

  it('Object with missing resource is not valid', () => {
    const reco = {
      title: 'Il y a mieux que le Samsung Galaxy S6',
      description:
        'Que vous ayez un usage basique, avancé, professionnel [...]',
      contributor: {
        name: 'Maarten Samson'
      },
      criteria: [
        {
          slug: 'health',
          label: 'Santé'
        }
      ],
      resource: {
        author: 'Boby',
        // url: 'http://choisir.lmem.net/samsung-galaxy-s6',
        // label: 'Lire le comparatif',
        editor: {
          label: 'Le Gorafi',
          url: 'http://legorafi.fr'
        }
      },
      alternatives: [
        {
          url_to_redirect: 'http://choisir.lmem.net/samsung-galaxy-s6',
          label: 'Voir l’alternative'
        }
      ]
    };

    expect(isNoticeValid(reco)).to.be.false;
  });

  it('Object with missing editor is not valid', () => {
    const reco = {
      title: 'Il y a mieux que le Samsung Galaxy S6',
      description:
        'Que vous ayez un usage basique, avancé, professionnel [...]',
      contributor: {
        name: 'Maarten Samson'
      },
      criteria: [
        {
          slug: 'health',
          label: 'Santé'
        }
      ],
      resource: {
        author: 'Boby',
        url: 'http://choisir.lmem.net/samsung-galaxy-s6',
        label: 'Lire le comparatif'
        // editor: {
        //   label: 'Le Gorafi',
        //   url: 'http://legorafi.fr',
        // },
      },
      alternatives: [
        {
          url_to_redirect: 'http://choisir.lmem.net/samsung-galaxy-s6',
          label: 'Voir l’alternative'
        }
      ]
    };

    expect(isNoticeValid(reco)).to.be.false;
  });

  it('Object with wrong criterion is not valid', () => {
    const reco = {
      title: 'Il y a mieux que le Samsung Galaxy S6',
      description:
        'Que vous ayez un usage basique, avancé, professionnel [...]',
      contributor: {
        name: 'Maarten Samson'
      },
      criteria: [
        {
          slug: 'health',
          label: 'Santé'
        },
        {
          // label: 'health',
          // description: 'Santé',
        }
      ],
      resource: {
        author: 'Boby',
        url: 'http://choisir.lmem.net/samsung-galaxy-s6',
        label: 'Lire le comparatif',
        editor: {
          label: 'Le Gorafi',
          url: 'http://legorafi.fr'
        }
      },
      alternatives: [
        {
          url_to_redirect: 'http://choisir.lmem.net/samsung-galaxy-s6',
          label: 'Voir l’alternative'
        }
      ]
    };

    expect(isNoticeValid(reco)).to.be.false;
  });

  it('Object with wrong alternative is not valid', () => {
    const reco = {
      title: 'Il y a mieux que le Samsung Galaxy S6',
      description:
        'Que vous ayez un usage basique, avancé, professionnel [...]',
      contributor: {
        name: 'Maarten Samson'
      },
      criteria: [
        {
          slug: 'health',
          label: 'Santé'
        }
      ],
      resource: {
        author: 'Boby',
        url: 'http://choisir.lmem.net/samsung-galaxy-s6',
        label: 'Lire le comparatif',
        editor: {
          label: 'Le Gorafi',
          url: 'http://legorafi.fr'
        }
      },
      alternatives: [
        {
          url_to_redirect: 'http://choisir.lmem.net/samsung-galaxy-s6',
          label: 'Voir l’alternative'
        },
        {
          // url_to_redirect: 'http://choisir.lmem.net/samsung-galaxy-s6',
          // label: 'Voir l’alternative',
        }
      ]
    };

    expect(isNoticeValid(reco)).to.be.false;
  });

  it('Object with all props is valid', () => {
    const reco = {
      title: 'Il y a mieux que le Samsung Galaxy S6',
      description:
        'Que vous ayez un usage basique, avancé, professionnel [...]',
      contributor: {
        name: 'Maarten Samson'
      },
      criteria: [
        {
          slug: 'health',
          label: 'Santé'
        }
      ],
      resource: {
        author: 'Boby',
        url: 'http://choisir.lmem.net/samsung-galaxy-s6',
        label: 'Lire le comparatif',
        editor: {
          label: 'Le Gorafi',
          url: 'http://legorafi.fr'
        }
      },
      alternatives: [
        {
          url_to_redirect: 'http://choisir.lmem.net/samsung-galaxy-s6',
          label: 'Voir l’alternative'
        }
      ]
    };

    expect(isNoticeValid(reco)).to.be.true;
  });

  it('Object with all props but optional is valid', () => {
    const reco = {
      title: 'Il y a mieux que le Samsung Galaxy S6',
      description:
        'Que vous ayez un usage basique, avancé, professionnel [...]',
      contributor: {
        name: 'Maarten Samson'
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
          label: 'Le Gorafi',
          url: 'http://legorafi.fr'
        }
      },
      alternatives: [
        //   {
        //     url_to_redirect: 'http://choisir.lmem.net/samsung-galaxy-s6',
        //     label: 'Voir l’alternative',
        //   },
      ]
    };

    expect(isNoticeValid(reco)).to.be.true;
  });
});
