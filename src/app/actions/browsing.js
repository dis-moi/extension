import { findAlternatives } from './alternatives';

export function webRequestLaunched(details) {
    return dispatch => dispatch(findAlternatives(details));
}
