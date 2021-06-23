import * as R from 'ramda';
import { Brand } from 'types';
import { NoticeItem } from './notice';

export type AvatarSize = 'small' | 'normal' | 'large' | 'extra_large';
export type Avatar = {
  [size in AvatarSize]: Picture;
};

interface Picture {
  url: string;
}

export type ContributorId = Brand<number, 'ContributorId'>;

export interface PinnedNotice extends NoticeItem {
  sort?: number;
}

interface Contribution {
  example: NoticeItem;
  pinnedNotices: PinnedNotice[];
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
  categories: string[];
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
  loading,
  categories: []
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

export const sortContributorsAlphabetically: SortSuggestedContributors = R.sortWith(
  [R.ascend(R.prop('name'))]
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
