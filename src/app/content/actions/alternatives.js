import { ALTERNATIVE_FOUND } from '../../constants/ActionTypes';

export default function alternativeFound(alternative) {
    return {
        type: ALTERNATIVE_FOUND,
        alternative
    };
}
