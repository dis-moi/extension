import * as _ from 'lodash'
import { ADD_OFFERS, REMOVE_ALL_OFFERS, RECEIVED_MATCHING_CONTEXTS } from './../constants/ActionTypes'

const initialState = [

];

export default function offers(state = initialState, action) {
    switch (action.type) {
        case RECEIVED_MATCHING_CONTEXTS:
            return action.payload;
            break;
        default:
            return state;
    }
}
