import React from 'react';
import { Link } from 'react-router-dom';
import { StatefulContributor } from 'app/lmem/contributor';
import Avatar from 'components/molecules/Avatar';
import UserName from 'components/atoms/UserName/UserName';
import Stat from 'components/atoms/Stat/Stat';
import BubbleIcon from 'components/atoms/icons/Bubble';
import StatType from 'components/atoms/Stat/StatType';
import ContributorButton from 'components/organisms/Contributor/ContributorButton';
import { Loading } from 'components/atoms/icons';
import { trilean } from 'types';

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
    <>
      {contributors.map(contributor => (
        <section key={contributor.id}>
          <Avatar size="normal" contributor={contributor} />
          <UserName>
            <Link to={`/les-contributeurs/${contributor.id}`}>
              {contributor.name}
            </Link>
          </UserName>
          <Stat>
            <BubbleIcon /> {contributor.contributions}{' '}
            <StatType>contributions</StatType>
          </Stat>
          <ContributorButton
            subscribed={contributor.subscribed}
            onSubscribe={subscribe(contributor)}
            onUnsubscribe={unsubscribe(contributor)}
          />
          <p>{contributor.intro}</p>
        </section>
      ))}
    </>
  );
};

export default ProfileList;
