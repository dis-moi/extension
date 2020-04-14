import Faker from 'faker';
import { Contributor } from 'app/lmem/contributor';

interface Options {
  id?: number;
  name?: string;
  contributions?: number;
  noAvatar?: boolean;
}

interface StatefulOptions extends Options {
  subscribed?: boolean;
}

export const generateContributor = ({
  id,
  name,
  contributions,
  noAvatar
}: Options = {}): Contributor => ({
  id: id || Faker.random.number(),
  name: name || Faker.name.findName(),
  contributions: contributions || Faker.random.number(),
  contribution: {
    example: {
      matchingUrl: 'http://www.bulles.fr',
      noticeId: 1,
      noticeUrl: 'http://'
    }
  },
  avatar: noAvatar
    ? undefined
    : {
        small: { url: Faker.image.avatar() },
        normal: { url: Faker.image.avatar() },
        large: { url: Faker.image.avatar() }
      },
  noticesUrls: ['http://backend.dismoi.io/notices/1']
});

export const generateStatefulContributor = ({
  subscribed,
  ...rest
}: StatefulOptions = {}) => ({
  ...generateContributor(rest),
  subscribed: subscribed === undefined ? false : subscribed
});
