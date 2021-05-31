import { Contributor } from 'libs/lmem/contributor';
import { get } from './call';

const fetchContributors = (): Promise<Contributor[]> => get('contributors');

export default fetchContributors;
