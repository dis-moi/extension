import { Contributor } from 'app/lmem/contributor';
import { OptionsState } from '../reducers';
import { createSelector } from 'reselect';
import * as R from 'ramda';

export const getSubscriptions = (state: OptionsState): Contributor[] =>
  state.contributors;

export const getContributorsSuggestions = getSubscriptions;

export const makeGetNContributorsSuggestions = (n: number) =>
  createSelector<OptionsState, Contributor[], Contributor[]>(
    [getContributorsSuggestions],
    R.take(n)
  );
