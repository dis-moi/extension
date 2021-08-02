import { Contributor } from 'libs/domain/contributor';
import { get } from './call';

const fetchContributors = (): Promise<Contributor[]> => get('contributors');

export default fetchContributors;
