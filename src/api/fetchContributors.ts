import { get } from './call';
import { Contributor } from '../app/lmem/contributor';

const fetchContributors = (): Promise<Contributor[]> => get('contributors');

export default fetchContributors;
