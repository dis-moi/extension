import Faker from 'faker';
import { Contributor } from 'app/lmem/contributor';

interface Options {
  id?: number;
  name?: string;
  contributions?: number;
}

export const generateContributor = ({
  id,
  name,
  contributions
}: Options = {}): Contributor => ({
  id: id || 42,
  name: name || Faker.name.findName(),
  contributions: contributions || Faker.random.number(),
  avatar: {
    small: { url: 'http://small' },
    normal: { url: 'http://normal' },
    large: { url: 'http://large' }
  }
});
