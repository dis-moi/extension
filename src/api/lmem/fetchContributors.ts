import { get } from './call';
import { OtherContributor } from 'app/lmem/contributor';

const fetchContributors = (): Promise<OtherContributor[]> =>
  get('contributors');

export default fetchContributors;
