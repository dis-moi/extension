import * as _ from 'lodash'
import { ADD_OFFERS } from './../constants/ActionTypes'

const initialState = [
    {
        matchingContext: {
            url: "/framasoft.net/",
        },
        alternatives: [
            {
                url: 'http://alternativeto.net',
                title: 'D\'autre alternatives bien cool',
                description: "Alternative To est un annuaire d'alternatives",
                contributor: "pepe",
            }
        ],
        description: 'Framasoft est le leader des annuaires open sources francais, vous feriez bien de rester sur ce site'
    },
    {
        matchingContext: {
            url: "/alternativeto.net/"
        },
        alternatives: [
            {
                url: 'http://framasoft.net',
                title: 'Aller chez framasoft',
                description: "Alternatives open source",
                contributor: "bibi",
            }
        ],
        description: 'Allez voir des trucs open source'
    },
    {
        matchingContext: {
            url: "http://www.amazon.fr/Beko-WML-15106-NE-linge/dp/B006MHD5QG",
        },
        alternatives: [
            {
                url: "http://www.amazon.fr/Beko-WML-15106-NE-linge/dp/B006MHD5QG",
                call_to_action: "Voir le classement et les alternatives",
                description: "Dans notre classement du 2 février 2016, le lave-linge Beko WML 15106 NE a terminé 134ème sur 134 lave-linges testés. Beaucoup d’alternatives moins chères ont eu une bien meilleure évaluation lors de nos tests.",
                tags: [
                    "price",
                    "quality",
                ],
                contributor: {
                    id: 'quechoisir',
                    description: 'L’UFC-Que Choisir est une association à but non lucratif, au service des consommateurs.',
                },
            },
        ],
    },
];

export default function offers(state = initialState, action) {
    switch (action.type) {
        case ADD_OFFERS:
            return _.concat(state, action.payload);
        default:
            return state;
    }
}
