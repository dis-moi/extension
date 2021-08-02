import { Contributor, ContributorId } from 'libs/domain/contributor';
import { get } from './call';

const fetchContributor = (contributorId: ContributorId): Promise<Contributor> =>
  get(`contributors/${contributorId}`);

export default fetchContributor;
