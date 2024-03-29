import Faker from 'faker';
import { subMonths, subWeeks } from 'date-fns';
import { NoticeItem, StatefulNoticeWithContributor } from 'libs/domain/notice';
import { defaultLng } from 'libs/i18n';
import {
  Contributor,
  PinnedNotice,
  ContributorId
} from 'libs/domain/contributor';
import { generateContributor } from './generateContributor';

interface Options {
  message?: string;
  strippedMessage?: string;
  created?: Date;
  modified?: string;
  likes?: number;
  dislikes?: number;
  contributor?: Contributor;
  liked?: boolean;
  disliked?: boolean;
  dismissed?: boolean;
  read?: boolean;
  exampleMatchingUrl?: string;
}

export const defaultMessage = `L’économie est (vraiment) un sport de combat : “La boule puante de MM. Cahuc et Zylberberg contre le “négationnisme” des économistes critiques le confirme : le combat idéologique tombe parfois dans le caniveau. Depuis vingt ans pourtant, s’est construit en France une contre-expertise économique crédible qui veut fournir aux dominés des outils pour penser (et résister à) la pseudo” construit en France une contre-expertise`;
export const messageWithYoutubeVideo = `Saviez-vous que Dark Vador n'a pas dit, "Luke, je suis ton père", mais "Non... Je suis ton père" ? La preuve en vidéo : <a href='https://www.youtube.com/watch?v=5OQiE9Nj3ko'>voir la vidéo</a> .`;

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
  exampleMatchingUrl
}: Options = {}): StatefulNoticeWithContributor => {
  const id = Math.random() * 1000;
  return {
    id,
    url: `http://backend.dismoi.io/notices/${id}`,
    exampleMatchingUrl: exampleMatchingUrl || Faker.internet.url(),
    created: created || subMonths(new Date(), 1),
    modified: modified || subWeeks(new Date(), 1).toDateString(),
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
    },
    locale: defaultLng
  };
};

export const generateNoticeItem = ({
  exampleMatchingUrl
}: {
  exampleMatchingUrl?: string;
} = {}): NoticeItem => ({
  exampleMatchingUrl: exampleMatchingUrl || Faker.internet.url(),
  id: 1,
  url: 'http://backend.dismoi.io/notices/1',
  message: defaultMessage,
  strippedMessage: defaultMessage,
  ratings: { likes: 2, dislikes: 2 },
  created: subMonths(new Date(), 1),
  modified: subWeeks(new Date(), 1).toDateString(),
  screenshot: Faker.image.imageUrl(),
  contributorId: 1 as ContributorId,
  relayersIds: [],
  visibility: 'public',
  locale: defaultLng
});

export const generatePinnedNotice = (): PinnedNotice => ({
  sort: 0,
  ...generateNoticeItem()
});
