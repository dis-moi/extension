import React from 'react';
import { StatefulContributor } from 'app/lmem/contributor';
import { Arrow, Loading } from 'components/atoms/icons';
import { trilean } from 'types';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import ContributorsList from 'components/organisms/Contributor/ContributorsList';
import Link from 'components/atoms/Link';

export interface ProfileListProps {
  loading: trilean;
  contributors: StatefulContributor[];
  subscribe: (contributor: StatefulContributor) => () => void;
  unsubscribe: (contributor: StatefulContributor) => () => void;
  showContributionsLink?: boolean;
}

const ProfileList = ({
  loading,
  contributors = [],
  subscribe,
  unsubscribe
}: ProfileListProps) => {
  if (typeof loading === 'undefined') {
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <ContributorsList>
      {contributors.map(contributor => (
        <ContributorLarge
          key={contributor.id}
          contributor={contributor}
          onSubscribe={subscribe(contributor)}
          onUnsubscribe={unsubscribe(contributor)}
          link={
            <Link to={`/les-contributeurs/${contributor.id}`}>
              Voir un exemple de ses contributions
              <Arrow />
            </Link>
          }
        />
      ))}
    </ContributorsList>
  );
};

export default ProfileList;
