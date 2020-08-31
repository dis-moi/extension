import * as R from 'ramda';

export type AvatarSize = 'small' | 'normal' | 'large';
export type Avatar = {
  [size in AvatarSize]: Picture;
};

interface Picture {
  url: string;
}

export type ContributorId = number;

interface Contribution {
  example: {
    matchingUrl: string;
    noticeId: number;
    noticeUrl: string;
  };
}

export interface BaseContributor {
  id: ContributorId;
  name: string;
  image?: string;
  avatar?: Avatar;
  intro?: string;
  contributions: number;
  website: string | null;
  banner?: string;
  contribution?: Contribution;
  noticesUrls: string[];
}

export interface FetchedContributor extends BaseContributor {
  contribution: Contribution;
}

export interface NewContributor {
  name: string;
  email: string;
}

export interface StatefulContributor extends BaseContributor {
  subscribed?: boolean;
  subscribing?: boolean;
  loading?: boolean;
}

export interface LoadableContributor extends BaseContributor {
  id: ContributorId;
  name: '';
  contributions: 0;
  website: null;
  noticesUrls: [];
  loading?: boolean;
}

interface LoadableContributorOptions {
  id: ContributorId;
  loading?: boolean;
}

export const createLoadableContributor = ({
  id,
  loading = true
}: LoadableContributorOptions) => ({
  id,
  name: '',
  contributions: 0,
  website: null,
  noticesUrls: [],
  loading
});

export type Contributor =
  | BaseContributor
  | StatefulContributor
  | LoadableContributor;

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
