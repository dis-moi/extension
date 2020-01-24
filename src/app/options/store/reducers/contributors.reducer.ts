import {Contributor, StatefulContributor} from 'app/lmem/contributor';
import {AppAction, CONTRIBUTORS_TRANSMITTED, UNSUBSCRIBE} from 'app/actions';
import * as R from "ramda";

export type ContributorsState = StatefulContributor[];

export const findContributorIn = (contributors: Contributor[]) => (
    contributor: Contributor
) => R.findIndex(R.propEq('id', contributor.id), contributors) as Contributor;


const contributorsReducer = (
  state: ContributorsState = [],
  { type , payload }: AppAction
): ContributorsState => {
  switch (type) {
    case CONTRIBUTORS_TRANSMITTED:
      return payload.contributors;

    case UNSUBSCRIBE:
      return [
        ...state,

        findContributorIn(state)
      ]

  }

  return state;
};

export default contributorsReducer;
