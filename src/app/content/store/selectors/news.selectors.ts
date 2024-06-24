import { createSelector } from 'reselect';
import { ContentState } from '../reducers';

const selectNews = (state: ContentState) => state.news;

export const getNews = createSelector([selectNews], news => news.message);
