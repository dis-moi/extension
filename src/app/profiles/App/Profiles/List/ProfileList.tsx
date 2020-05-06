import React from 'react';
import { StatefulContributor } from 'app/lmem/contributor';
import { Loading } from 'components/atoms/icons';
import { trilean } from 'types';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import ContributorsList from 'components/organisms/Contributor/ContributorsList';
import { Background, PageContainer } from '../Components';

export interface ProfileListProps {
  loading: trilean;
  contributors: StatefulContributor[];
  subscribe: (contributor: StatefulContributor) => () => void;
  unsubscribe: (contributor: StatefulContributor) => () => void;
  showExampleLink?: boolean;
  highlightExampleLink?: boolean;
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
    <Background>
      <PageContainer>
        <ContributorsList>
          {contributors.map(contributor => (
            <ContributorLarge
              key={contributor.id}
              contributor={contributor}
              onSubscribe={subscribe(contributor)}
              onUnsubscribe={unsubscribe(contributor)}
            />
          ))}
        </ContributorsList>
      </PageContainer>
    </Background>
  );
};

export default ProfileList;
