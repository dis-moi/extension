import chai from 'chai';

import recommendationIsValid from '../../../src/app/lmem/recommendationIsValid';

const expect = chai.expect;

describe('recommendationIsValid', function () {

  it('Non objects are not valid', () => {
    expect( recommendationIsValid(true) ).to.be.false;
    expect( recommendationIsValid(32) ).to.be.false;
    expect( recommendationIsValid("yo") ).to.be.false;
    expect( recommendationIsValid(null) ).to.be.false;
    expect( recommendationIsValid(undefined) ).to.be.false;
  });

  it('Empty object is not valid', () => {
    expect( recommendationIsValid({}) ).to.be.false;
  });

  it('Object with missing contrbutor is not valid', () => {
    const reco = {
        /*contributor: {
            name: 'Maarten Samson',
        },*/
        visibility: 'public', // or 'private'
        title: 'Il y a mieux que le Samsung Galaxy S6',
        editor: {
            name: 'Le Gorafi',
        },
        description: 'Que vous ayez un usage basique, avancé, professionnel, geek, joueur régulier ou même photographe amateur, il existe de meilleurs smartpthones en termes de qualité/prix, santé et éthique de la marque.',
        recommendations: [
            {
                url_to_redirect: 'http://choisir.lmem.net/samsung-galaxy-s6-qualite-sante-ethique-les-meilleures-alternatives/',
                label: 'Voir le comparatif',
            },
        ]
    };


    expect( recommendationIsValid(reco) ).to.be.false;
  });

  it('Object with missing title is not valid', () => {
    const reco = {
        contributor: {
            name: 'Maarten Samson',
        },
        visibility: 'public', // or 'private'
        //title: 'Il y a mieux que le Samsung Galaxy S6',
        editor: {
            name: 'Le Gorafi',
        },
        description: 'Que vous ayez un usage basique, avancé, professionnel, geek, joueur régulier ou même photographe amateur, il existe de meilleurs smartpthones en termes de qualité/prix, santé et éthique de la marque.',
        recommendations: [
            {
                url_to_redirect: 'http://choisir.lmem.net/samsung-galaxy-s6-qualite-sante-ethique-les-meilleures-alternatives/',
                label: 'Voir le comparatif',
            },
        ]
    };


    expect( recommendationIsValid(reco) ).to.be.false;
  });

  /*it('Object with missing editor is not valid', () => {
    const reco = {
        contributor: {
            name: 'Maarten Samson',
        },
        visibility: 'public', // or 'private'
        title: 'Il y a mieux que le Samsung Galaxy S6',
        //editor: { name: 'Le Gorafi' },
        description: 'Que vous ayez un usage basique, avancé, professionnel, geek, joueur régulier ou même photographe amateur, il existe de meilleurs smartpthones en termes de qualité/prix, santé et éthique de la marque.',
        recommendations: [
            {
                url_to_redirect: 'http://choisir.lmem.net/samsung-galaxy-s6-qualite-sante-ethique-les-meilleures-alternatives/',
                label: 'Voir le comparatif',
            },
        ]
    };


    expect( recommendationIsValid(reco) ).to.be.false;
  });*/

  it('Object with missing description is not valid', () => {
    const reco = {
        contributor: {
            name: 'Maarten Samson',
        },
        visibility: 'public', // or 'private'
        title: 'Il y a mieux que le Samsung Galaxy S6',
        editor: {
            name: 'Le Gorafi',
        },
        //description: 'Que vous ayez un usage basique, avancé, professionnel, geek, joueur régulier ou même photographe amateur, il existe de meilleurs smartpthones en termes de qualité/prix, santé et éthique de la marque.',
        recommendations: [
            {
                url_to_redirect: 'http://choisir.lmem.net/samsung-galaxy-s6-qualite-sante-ethique-les-meilleures-alternatives/',
                label: 'Voir le comparatif',
            },
        ]
    };


    expect( recommendationIsValid(reco) ).to.be.false;
  });

  /*it('Object with missing recommendations is not valid', () => {
    const reco = {
        contributor: {
            name: 'Maarten Samson',
        },
        visibility: 'public', // or 'private'
        title: 'Il y a mieux que le Samsung Galaxy S6',
        editor: {
            name: 'Le Gorafi',
        },
        description: 'Que vous ayez un usage basique, avancé, professionnel, geek, joueur régulier ou même photographe amateur, il existe de meilleurs smartpthones en termes de qualité/prix, santé et éthique de la marque.',
        //recommendations: [
        //    {
        //        url_to_redirect: 'http://choisir.lmem.net/samsung-galaxy-s6-qualite-sante-ethique-les-meilleures-alternatives/',
        //        label: 'Voir le comparatif',
        //    },
        //]
    };


    expect( recommendationIsValid(reco) ).to.be.false;
  });*/

  it('Object with all props is valid', () => {
    const reco = {
        contributor: {
            name: 'Maarten Samson',
        },
        visibility: 'public', // or 'private'
        title: 'Il y a mieux que le Samsung Galaxy S6',
        editor: {
            name: 'Le Gorafi',
        },
        description: 'Que vous ayez un usage basique, avancé, professionnel, geek, joueur régulier ou même photographe amateur, il existe de meilleurs smartpthones en termes de qualité/prix, santé et éthique de la marque.',
        recommendations: [
            {
                url_to_redirect: 'http://choisir.lmem.net/samsung-galaxy-s6-qualite-sante-ethique-les-meilleures-alternatives/',
                label: 'Voir le comparatif',
            },
        ]
    };


    expect( recommendationIsValid(reco) ).to.be.true;
  });


});