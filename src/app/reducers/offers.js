import * as _ from 'lodash'
import { ADD_OFFERS, REMOVE_ALL_OFFERS } from './../constants/ActionTypes'

const initialState = [
    {
        matchingContext: {
            url: "localhost",
        },
        alternatives: [
            {
                url: 'http://alternativeto.net',
                call_to_action: 'Voir le guide',
                tags: [
                    'quality',
                ],
                description: "Alternative To est un annuaire d'alternatives",
                contributor: [{
                    id: "quechoisir",
                    description: "L'UFC-Que Choisir est une association a but non lucratif, au service des consommateurs.",
                }]
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
                contributor: [{
                    id: "backmarket",
                    description: "Specialiste francais de l'electronique d'occasion.",
                }],
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
                description: "Dans notre classement du 2 fevrier 2016, le lave-linge Beko WML 15106 NE a termine 134eme sur 134 lave-linges testes. Beaucoup d'alternatives moins cheres ont eu une bien meilleure evaluation lors de nos tests.",
                tags: [
                    "price",
                    "quality",
                ],
                contributor: [{
                    id: 'quechoisir',
                    description: "L'UFC-Que Choisir est une association a but non lucratif, au service des consommateurs.",
                }],
            },
        ],
    },
];

export default function offers(state = initialState, action) {
    switch (action.type) {
        case ADD_OFFERS:
            if(action.payload == null || action.payload == '') return state;
            return _.concat(state, JSON.parse(action.payload));
        case REMOVE_ALL_OFFERS:
            return [];
        default:
            return state;
    }
}
