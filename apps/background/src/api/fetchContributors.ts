import { get } from './call';
import { Contributor } from '../../../../../../libs/lmem/contributor';

const fetchContributors = (): Promise<Contributor[]> => get('contributors');

export default fetchContributors;
