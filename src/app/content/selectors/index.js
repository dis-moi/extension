import { getById } from './notices';
import recommendationFilter from '../../lmem/recommendationFilter';

export const getNotices = state => state.get('recommendations');

export const getNoticeById = (state, { match: { params } }) => getById(getNotices(state), params);

export const isOpen = state => state.getIn(['open', 'open']);
export const isMounted = state => state.getIn(['open', 'mounted']);

export const getFilteredNotices = state => getNotices(state).filter(recommendationFilter);

export const getOnInstalledDetails = state => state.get('onInstalledDetails');

export const getInstallationDate = state => getOnInstalledDetails(state).get('datetime');
