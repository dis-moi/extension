import Faker from 'faker';
import { Contributor } from 'app/lmem/contributor';
import {
  generateNoticeItem,
  generatePinnedNotice
} from 'test/fakers/generateNotice';

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
    example: generateNoticeItem(),
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
