import Faker from 'faker';
import { MatchingContext } from 'app/lmem/matchingContext';

interface Options {
  urlRegex?: string;
  excludeUrlRegex?: string;
}

const generateMatchingContext = ({
  urlRegex,
  excludeUrlRegex
}: Options = {}): MatchingContext => {
  const id = Faker.random.number();
  const noticeId = Faker.random.number();
  return {
    id,
    urlRegex: urlRegex || Faker.internet.url(),
    excludeUrlRegex,
    noticeUrl: `https://backend.dismoi.io/notices/${noticeId}`,
    noticeId
  } as MatchingContext;
};

export default generateMatchingContext;
