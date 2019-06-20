import * as R from 'ramda';

interface Avatar {
  small: Picture;
  normal: Picture;
  large: Picture;
}
interface Picture {
  url: string;
}

export interface Contributor {
  id: number;
  name: string;
  image?: string;
  avatar?: Avatar;
  intro?: string;
  contributions: number;
}

export interface NewContributor {
  name: string;
  email: string;
}

export interface StatefulContributor extends Contributor {
  subscribed?: boolean;
}

export const contributorIsSubscribed = (
  contributor: StatefulContributor
): boolean => Boolean(contributor.subscribed);

type SortSuggestedContributors = (contributors: Contributor[]) => Contributor[];
export const sortSuggestedContributors: SortSuggestedContributors = R.sortWith([
  R.descend(R.prop('contributions'))
]);
