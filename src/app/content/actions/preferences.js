import { DEACTIVATED_WEBSITES } from '../../constants/ActionTypes';

export default function(deactivatedWebsites) {
    return {
        type: DEACTIVATED_WEBSITES,
        deactivatedWebsites
    };
}
