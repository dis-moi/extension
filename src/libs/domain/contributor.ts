import * as R from 'ramda';
import { Brand } from 'types';
import { defaultLng, SupportedLanguage } from '../i18n';
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
  locale: SupportedLanguage;
  ratings: {
    subscribes: number;
  };
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
}: LoadableContributorOptions): LoadableContributor => ({
  id,
  name: '',
  contributions: 0,
  website: null,
  noticesUrls: [],
  loading,
  categories: [],
  locale: defaultLng,
  ratings: { subscribes: 0 }
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

export const sortContributorsBySubscribers = (
  contributors: Contributor[]
): Contributor[] =>
  R.sort((a, b) => b.ratings?.subscribes - a.ratings?.subscribes, contributors);

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

export const getContributorFieldsToTrack = (contributor?: BaseContributor) => {
  if (contributor) {
    return {
      id: contributor.id,
      name: contributor.name
    };
  }
};
