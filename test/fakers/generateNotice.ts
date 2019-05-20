import { subMonths, subWeeks } from 'date-fns';
import Faker from 'faker';
import { StatefulNotice } from '../../src/app/lmem/notice';
import { Intention } from '../../src/app/lmem/intention';

interface Options {
  intention?: Intention;
  message?: string | number;
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
}

export const defaultSourceUrl =
  'https://blogs.mediapart.fr/thomas-coutrot/blog/040916/leconomie-est-vraiment-un-sport-de-combat';

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
  read
}: Options = {}): StatefulNotice => ({
  id: 123,
  intention: intention || 'approval',
  created: created || subMonths(new Date(), 1),
  modified: modified || subWeeks(new Date(), 1),
  message:
    typeof message === 'string' ? message : Faker.lorem.paragraph(message || 3),
  ratings: { likes: likes || 42, dislikes: dislikes || 2 },
  contributor: { id: 1, name: contributor || Faker.name.findName() },
  visibility: 'public',
  source: {
    label: sourceName || Faker.company.companyName(),
    url: sourceUrl || defaultSourceUrl
  },
  state: {
    liked: Boolean(liked),
    dismissed: Boolean(dismissed),
    disliked: Boolean(disliked),
    read: Boolean(read)
  }
});
