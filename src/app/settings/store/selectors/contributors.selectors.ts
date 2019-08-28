import { Contributor } from 'app/lmem/contributor';
import { SettingsState } from '../reducers';

export const getContributors = (state: SettingsState): Contributor[] =>
  state.contributors;
