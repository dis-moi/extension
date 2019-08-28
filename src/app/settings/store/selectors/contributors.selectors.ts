import { Contributor } from 'app/lmem/contributor';
import { SettingsState } from '../reducers';
import { createSelector } from 'reselect';
import * as R from 'ramda';

export const getSubscriptions = (state: SettingsState): Contributor[] =>
  state.contributors;

export const getContributorsSuggestions = getSubscriptions;

export const makeGetNContributorsSuggestions = (n: number) =>
  createSelector<SettingsState, Contributor[], Contributor[]>(
    [getContributorsSuggestions],
    R.take(n)
  );
