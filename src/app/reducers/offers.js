import Immutable from 'immutable';

const initialState = [
    {
        match: "/framasoft.net/",
        alternatives: [
            {
                url: 'http://alternativeto.net',
                title: 'D\'autre alternatives bien cool'
            }
        ],
        description: 'Framasoft est le leader des annuaires open sources fran&ccedil;ais, vous feriez bien de rester sur ce site'
    },
    {
        match: "/alternativeto.net/",
        alternatives: [
            {
                url: 'http://framasoft.net',
                title: 'Aller chez framasoft'
            }
        ],
        description: 'Allez voir des trucs open source'
    }
];

export default function offers(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}