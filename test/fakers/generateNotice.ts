import { subMonths, subWeeks } from 'date-fns';
import Faker from 'faker';
import { StatefulNotice } from 'app/lmem/notice';
import { Intention } from 'app/lmem/intention';
import { Contributor } from 'app/lmem/contributor';
import { generateContributor } from './generateContributor';

interface Options {
  message?: string;
  created?: Date;
  modified?: Date;
  likes?: number;
  dislikes?: number;
  contributor?: Contributor;
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
  created: created || subMonths(new Date(), 1),
  modified: modified || subWeeks(new Date(), 1),
  message: message || defaultMessage,
  ratings: { likes: likes || 42, dislikes: dislikes || 2 },
  contributor: contributor || generateContributor(),
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
