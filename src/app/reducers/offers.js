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
                call_to_action: 'Voir le guide',
                tags: [
                    'quality',
                ],
                description: "Alternative To est un annuaire d’alternatives",
                contributor: {
                    id: "quechoisir",
                    description: "L’UFC-Que Choisir est une association à but non lucratif, au service des consommateurs.",
                }
            }
        ],
    },
    {
        matchingContext: {
            url: "/alternativeto.net/"
        },
        alternatives: [
            {
                url: 'http://framasoft.net',
                call_to_action: 'Aller sur Framasoft',
                description: "Alternatives libres et ouvertes",
                tags: [
                    'price',
                    'ecology',
                ],
                contributor: {
                    id: "backmarket",
                    description: "Spécialiste français de l’électronique d’occasion.",
                },
            }
        ],
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
