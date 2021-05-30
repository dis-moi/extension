import { Contributor } from 'app/lmem/contributor';
import { get } from './call';

const fetchContributors = (): Promise<Contributor[]> => get('contributors');

export default fetchContributors;
