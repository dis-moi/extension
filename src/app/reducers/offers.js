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
    }
];

export default function offers(state = initialState, action) {
    switch (action.type) {
        case ADD_OFFERS:
            return _.concat(state, action.payload);
        default:
            return state;
    }
}
