const initialState = [
    {
        matchingContext: {
            url: "/framasoft.net/",
        },
        alternatives: [
            {
                url: 'http://alternativeto.net',
                title: 'D\'autre alternatives bien cool',
                description: "Alternative To est un annuaire d'alternatives"
            }
        ],
        description: 'Framasoft est le leader des annuaires open sources fran&ccedil;ais, vous feriez bien de rester sur ce site'
    },
    {
        matchingContext: {
            url: "/alternativeto.net/"
        },
        alternatives: [
            {
                url: 'http://framasoft.net',
                title: 'Aller chez framasoft',
                description: "Alternatives open source"
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