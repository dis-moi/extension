import Faker from 'faker';
import { subMonths, subWeeks } from 'date-fns';
import { StatefulNoticeWithContributor } from 'app/lmem/notice';
import { Contributor } from 'app/lmem/contributor';
import { generateContributor } from './generateContributor';

interface Options {
  message?: string;
  strippedMessage?: string;
  created?: Date;
  modified?: Date;
  likes?: number;
  dislikes?: number;
  contributor?: Contributor;
  liked?: boolean;
  disliked?: boolean;
  dismissed?: boolean;
  read?: boolean;
  exampleUrl?: string;
}

export const defaultMessage = `L’économie est (vraiment) un sport de combat : “La boule puante de MM. Cahuc et Zylberberg contre le “négationnisme” des économistes critiques le confirme : le combat idéologique tombe parfois dans le caniveau. Depuis vingt ans pourtant, s’est construit en France une contre-expertise économique crédible qui veut fournir aux dominés des outils pour penser (et résister à) la pseudo” construit en France une contre-expertise`;

export const generateStatefulNotice = ({
  message,
  strippedMessage,
  created,
  modified,
  contributor,
  likes,
  dislikes,
  liked,
  disliked,
  dismissed,
  read,
  exampleUrl
}: Options = {}): StatefulNoticeWithContributor => {
  const id = Math.random() * 1000;
  return {
    id,
    url: `http://backend.dismoi.io/notices/${id}`,
    exampleUrl: exampleUrl || Faker.internet.url(),
    created: created || subMonths(new Date(), 1),
    modified: modified || subWeeks(new Date(), 1),
    message: message || defaultMessage,
    strippedMessage: strippedMessage || message || defaultMessage,
    ratings: { likes: likes || 42, dislikes: dislikes || 2 },
    contributor: contributor || generateContributor(),
    relayers: [generateContributor()],
    visibility: 'public',
    state: {
      liked: Boolean(liked),
      dismissed: Boolean(dismissed),
      disliked: Boolean(disliked),
      read: Boolean(read)
    }
  };
};
