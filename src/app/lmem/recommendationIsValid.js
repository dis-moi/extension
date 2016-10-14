/**
 * It happened in the past that invalid recommendation object result in broken UI
 * https://github.com/insitu-project/proto-ext/issues/85
 * This was due to the server sending back objects with missing fields
 * This function validates the object at runtime to decide what to do before the 
 * object gets sent to the UI.
 */

/*

const reco = {
    contributor: {
        name: 'Maarten Samson',
    },
    visibility: 'public' // or 'private'
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
    ],
};

*/


export default function(reco){
    console.log('validating reco', reco)
    if(Object(reco) !== reco){
        return false;
    }

    const { contributor, title, editor, description, recommendations } = reco;

    return Object(contributor) === contributor && typeof contributor.name === 'string' &&
        typeof title === 'string' &&
        //Object(editor) === editor && typeof editor.name === 'string' &&
        typeof description === 'string' // &&
        //Array.isArray(recommendations) && recommendations.length >= 1 &&
        //recommendations.every(r => 
        //    Object(r) === r && typeof r.url_to_redirect === 'string' && typeof r.label === 'string'
        //);
}