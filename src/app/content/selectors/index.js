import { getById } from './notices';
import recommendationFilter from '../../lmem/recommendationFilter';

export const getNotices = state => state.get('recommendations');

export const getNoticeById = (state, { match: { params } }) => getById(getNotices(state), params);

export const isOpen = state => state.get('open');

export const getFilteredNotices = state => getNotices(state).filter(recommendationFilter);