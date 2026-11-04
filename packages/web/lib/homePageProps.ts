import { GetStaticProps } from 'next';
import { BaseContributor } from '@dismoi/domain/contributor';
import { contributorsIds } from '../contributorsIds';

export interface HomePageProps {
  contributors: BaseContributor[];
}

export const getHomePageStaticProps: GetStaticProps<
  HomePageProps
> = async () => {
  const ids = contributorsIds.dismoi;

  try {
    const res = await fetch('https://notices.bulles.fr/api/v3/contributors');
    const allContributors: BaseContributor[] = await res.json();
    const contributors = allContributors.filter((c) => ids.includes(c.id));

    return {
      props: { contributors },
      revalidate: 3600,
    };
  } catch {
    return {
      props: { contributors: [] },
      revalidate: 60,
    };
  }
};
