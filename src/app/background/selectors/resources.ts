import { createSelector } from 'reselect';
import { Contributor } from 'app/lmem/contributor';
import { BackgroundState } from '../reducers';

export const findItemById = <Item extends { id: number }>(id: number) => (
  items: Item[]
): Item | undefined => items.find(item => id === item.id);

export const getMatchingContexts = (state: BackgroundState) =>
  state.resources.matchingContexts;

export const getDraftNotices = (state: BackgroundState) =>
  state.resources.drafts;

export const getContributors = (state: BackgroundState): Contributor[] =>
  state.resources.contributors;

export const getContributorById = (id: number) =>
  createSelector(
    [getContributors],
    findItemById(id)
  );
