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
  contribution: {
    example: {
      matchingUrl: string;
      noticeId: number;
      noticeUrl: string;
    };
  };
  noticesUrls: string[];
}

export interface NewContributor {
  name: string;
  email: string;
}

export interface StatefulContributor extends Contributor {
  subscribed?: boolean;
  subscribing: boolean;
}

export const contributorIsSubscribed = (
  contributor: StatefulContributor
): boolean => Boolean(contributor.subscribed);

type SortSuggestedContributors = (contributors: Contributor[]) => Contributor[];

export const sortContributorsByContributions: SortSuggestedContributors = R.sortWith(
  [R.descend(R.prop('contributions'))]
);

export const createFindContributorById = (contributors: Contributor[]) => (
  id: number
) => R.find(R.propEq('id', id), contributors) as Contributor;

export const findContributorIn = (contributors: Contributor[]) => (
  contributor: Contributor
) => createFindContributorById(contributors)(contributor.id);

export const createContributorExists = (contributors: Contributor[]) => (
  id: number
): boolean => !!createFindContributorById(contributors)(id);
