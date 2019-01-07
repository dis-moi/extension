import { UPDATE_DRAFT_RECOMMENDATIONS } from '../../constants/ActionTypes';
import createAction from '../../utils/createAction';

export default createAction(UPDATE_DRAFT_RECOMMENDATIONS)(draftRecommendations => ({ draftRecommendations }));
