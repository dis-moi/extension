import * as R from 'ramda';

export type AvatarSize = 'small' | 'normal' | 'large';
export type Avatar = {
  [size in AvatarSize]: Picture;
};

interface Picture {
  url: string;
}

export type ContributorId = number;

export interface Contributor {
  id: ContributorId;
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

export const findContributorIn = (contributors: Contributor[]) => (
  contributor: Contributor
) => R.find(R.propEq('id', contributor.id), contributors) as Contributor;
