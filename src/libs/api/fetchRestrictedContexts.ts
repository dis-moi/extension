import { RestrictedContext } from 'libs/domain/matchingContext';
import { get } from './call';

const fetchRestrictedContexts = (): Promise<RestrictedContext[]> =>
  get('restricted-contexts');

export default fetchRestrictedContexts;
