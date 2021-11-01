import { BaseContributor } from '../../../../libs/domain/contributor';

const getContributors = async (): Promise<BaseContributor[] | undefined> => {
  const url = 'https://notices.bulles.fr/api/v3/contributors';
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    // console.error(error);
  }
};
export default getContributors;
