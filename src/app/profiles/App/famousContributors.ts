import { Contributor } from '../../../libs/domain/contributor';
import { asArray } from '../../../libs/utils/env';

const famousContributors = asArray<Contributor['id']>(
  process.env.FAMOUS_CONTRIBUTORS_PROFILE_SIDEBAR
);

export default famousContributors;
