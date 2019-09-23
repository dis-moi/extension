import Faker from 'faker';
import { Contributor, Avatar } from 'app/lmem/contributor';

interface Options {
  id?: number;
  name?: string;
  contributions?: number;
  noAvatar?: boolean;
}

export const generateContributor = ({
  id,
  name,
  contributions,
  noAvatar
}: Options = {}): Contributor => ({
  id: id || 42,
  name: name || Faker.name.findName(),
  contributions: contributions || Faker.random.number(),
  avatar: noAvatar ? undefined :
    {
      small: { url: Faker.image.avatar() },
      normal: { url: Faker.image.avatar() },
      large: { url: Faker.image.avatar() }
    }
});
