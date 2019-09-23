import { subMonths, subWeeks } from 'date-fns';
import * as R from 'ramda';
import Faker from 'faker';
import { NoticeState, StatefulNotice } from '../../src/app/lmem/notice';
import { Intention } from '../../src/app/lmem/intention';
import { Source } from '../../src/app/lmem/source';
import { Contributor } from '../../src/app/lmem/contributor';
import { Ratings } from '../../src/app/lmem/rating';

interface Options {
  intention?: Intention;
  message?: string;
  created?: Date;
  modified?: Date;
  likes?: number;
  dislikes?: number;
  contributor?: string;
  sourceName?: string;
  sourceUrl?: string;
  liked?: boolean;
  disliked?: boolean;
  dismissed?: boolean;
  read?: boolean;
  withSource?: boolean;
}

export const defaultSourceUrl =
  'https://blogs.mediapart.fr/thomas-coutrot/blog/040916/leconomie-est-vraiment-un-sport-de-combat';
export const defaultMessage = `L’économie est (vraiment) un sport de combat : “La boule puante de MM. Cahuc et Zylberberg contre le “négationnisme” des économistes critiques le confirme : le combat idéologique tombe parfois dans le caniveau. Depuis vingt ans pourtant, s’est construit en France une contre-expertise économique crédible qui veut fournir aux dominés des outils pour penser (et résister à) la pseudo” construit en France une contre-expertise`;

export const generateStatefulNotice = ({
  intention,
  message,
  created,
  modified,
  contributor,
  sourceName,
  sourceUrl,
  likes,
  dislikes,
  liked,
  disliked,
  dismissed,
  read,
  withSource = true
}: Options = {}): StatefulNotice => ({
  id: Math.random() * 1000,
  intention: intention || 'approval',
  created: created || subMonths(new Date(), 1),
  modified: modified || subWeeks(new Date(), 1),
  message: message || defaultMessage,
  ratings: { likes: likes || 42, dislikes: dislikes || 2 },
  contributor: {
    id: 1,
    name: contributor || Faker.name.findName(),
    contributions: Faker.random.number()
  },
  visibility: 'public',
  source: withSource
    ? {
        label: sourceName || Faker.company.companyName(),
        url: sourceUrl || defaultSourceUrl
      }
    : undefined,
  state: {
    liked: Boolean(liked),
    dismissed: Boolean(dismissed),
    disliked: Boolean(disliked),
    read: Boolean(read)
  }
});

type Transformer<T> = (obj: T) => T;

const assocIfGiven = <T extends { [k: string]: any }, K extends keyof T>(
  key: string & K,
  value?: T[K]
): Transformer<T> => {
  if (value) return R.assoc<typeof value, typeof key>(key, value);
  return R.identity;
};

export const generateStatefulNoticeVariant = (
  notice: StatefulNotice,
  {
    intention,
    message,
    created,
    modified,
    contributor,
    sourceName,
    sourceUrl,
    likes,
    dislikes,
    liked,
    disliked,
    dismissed,
    read,
    withSource = true
  }: Options
): StatefulNotice => {
  const defaultSource: Source = {
    label: Faker.company.companyName(),
    url: defaultSourceUrl
  };
  const newSource: Source | undefined =
    sourceName || sourceUrl || withSource
      ? R.pipe(
          assocIfGiven<Source, 'label'>('label', sourceName),
          assocIfGiven<Source, 'url'>('url', sourceUrl)
        )(notice.source || defaultSource)
      : undefined;

  const newContrib: Contributor = assocIfGiven<Contributor, 'name'>(
    'name',
    contributor
  )(notice.contributor);

  const newRatings: Ratings = R.pipe(
    assocIfGiven<Ratings, 'likes'>('likes', likes),
    assocIfGiven<Ratings, 'dislikes'>('dislikes', dislikes)
  )(notice.ratings);

  const newState: NoticeState = R.pipe(
    assocIfGiven<NoticeState, 'liked'>('liked', liked),
    assocIfGiven<NoticeState, 'disliked'>('disliked', disliked),
    assocIfGiven<NoticeState, 'dismissed'>('dismissed', dismissed),
    assocIfGiven<NoticeState, 'read'>('read', read)
  )(notice.state);

  return R.pipe(
    assocIfGiven<StatefulNotice, 'intention'>('intention', intention),
    assocIfGiven<StatefulNotice, 'message'>('message', message),
    assocIfGiven<StatefulNotice, 'created'>('created', created),
    assocIfGiven<StatefulNotice, 'modified'>('modified', modified),
    assocIfGiven<StatefulNotice, 'contributor'>('contributor', newContrib),
    assocIfGiven<StatefulNotice, 'source'>('source', newSource),
    assocIfGiven<StatefulNotice, 'ratings'>('ratings', newRatings),
    assocIfGiven<StatefulNotice, 'state'>('state', newState)
  )(notice);
};
