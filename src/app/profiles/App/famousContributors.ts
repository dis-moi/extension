import { ContributorId } from '../../../libs/domain/contributor';

const famousContributors: ContributorId[] | undefined =
  process.env.FAMOUS_CONTRIBUTORS_PROFILE_SIDEBAR &&
  JSON.parse(process.env.FAMOUS_CONTRIBUTORS_PROFILE_SIDEBAR);

export default famousContributors;
