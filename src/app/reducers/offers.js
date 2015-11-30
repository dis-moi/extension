import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    'framasoft.net': {
        alternatives: [
            {
                url: 'alternative.to',
                title: 'D\'autre alternatives bien cool'
            }
        ],
        description: 'Framasoft est le leader des annuaires open sources français, vous feriez bien de rester sur ce site'
    }
});

export default function offers(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}