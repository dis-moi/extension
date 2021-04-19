import Faker from 'faker';
import { defaultMessage } from 'test/fakers/generateNotice';
import { Contribution } from 'app/lmem/notice';
import { generateNewContributor } from './generateContributor';

export const generateContribution = ({
  url,
  created,
  contributor,
  message
}: Partial<Contribution> = {}): Contribution => ({
  url: url || Faker.internet.url(),
  created: created || new Date(),
  contributor: contributor || generateNewContributor(),
  message: message || defaultMessage
});

export default generateContribution;
