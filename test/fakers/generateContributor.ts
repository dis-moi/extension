import Faker from 'faker';
import { Contributor, PinnedNotice } from 'app/lmem/contributor';
import { subMonths, subWeeks } from 'date-fns';

interface Options {
  id?: number;
  name?: string;
  contributions?: number;
  noAvatar?: boolean;
  website?: string | null;
}

interface StatefulOptions extends Options {
  subscribed?: boolean;
  subscribing?: boolean;
  loading?: boolean;
}

export const generatePinnedNotice = (): PinnedNotice => ({
  sort: 0,
  exampleMatchingUrl: Faker.internet.url(),
  id: 1,
  url: 'http://backend.dismoi.io/notices/1',
  strippedMessage: 'stripped message',
  created: subMonths(new Date(), 1),
  modified: subWeeks(new Date(), 1),
  screenshot: Faker.image.imageUrl()
});

export const generateContributor = ({
  id,
  name,
  contributions,
  noAvatar,
  website
}: Options = {}): Contributor => ({
  id: id || Faker.random.number(),
  name: name || Faker.name.findName(),
  contributions: contributions || Faker.random.number(),
  contribution: {
    example: {
      sort: 0,
      exampleMatchingUrl: Faker.internet.url(),
      id: 1,
      url: 'http://backend.dismoi.io/notices/1',
      strippedMessage: 'stripped message',
      created: subMonths(new Date(), 1),
      modified: subWeeks(new Date(), 1),
      screenshot: Faker.image.imageUrl()
    },
    starred: generatePinnedNotice(),
    pinnedNotices: [generatePinnedNotice()]
  },
  avatar: noAvatar
    ? undefined
    : {
        small: { url: Faker.image.avatar() },
        normal: { url: Faker.image.avatar() },
        large: { url: Faker.image.avatar() }
      },
  noticesUrls: ['http://backend.dismoi.io/notices/1'],
  website: website || Faker.internet.url(),
  categories: [Faker.random.word()]
});

export const generateStatefulContributor = ({
  subscribed,
  subscribing,
  loading,
  ...rest
}: StatefulOptions = {}) => ({
  ...generateContributor(rest),
  subscribed: subscribed === undefined ? false : subscribed,
  subscribing: subscribing === undefined ? false : subscribing,
  loading: loading === undefined ? false : loading
});
