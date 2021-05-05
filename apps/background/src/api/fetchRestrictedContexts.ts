import { RestrictedContext } from '../../../../../../libs/lmem/matchingContext';
import { get } from './call';

const fetchRestrictedContexts = (): Promise<RestrictedContext[]> =>
  get('restricted-contexts');

export default fetchRestrictedContexts;
