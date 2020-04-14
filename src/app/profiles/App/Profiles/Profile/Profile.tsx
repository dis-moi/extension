import React, { useEffect } from 'react';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import { StatefulContributor } from 'app/lmem/contributor';
import { Notice } from 'app/lmem/notice';
import { Loading } from 'components/atoms/icons';
import Error from '../../Error';
import ProfileNoticeList from './ProfileNoticeList';
import { trilean } from 'types';

export interface ProfileProps {
  loading: trilean;
  contributor?: StatefulContributor;
  noticesLoading: trilean;
  notices: Notice[];
  subscribe: () => void;
  unsubscribe: () => void;
  fetchContributorNotices: () => void;
}

export const Profile = ({
  loading,
  contributor,
  subscribe,
  unsubscribe,
  fetchContributorNotices,
  noticesLoading,
  notices
}: ProfileProps) => {
  useEffect(() => {
    fetchContributorNotices();
  }, []);
  if (typeof loading === 'undefined') {
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  if (!contributor) {
    return <Error />;
  }

  return (
    <>
      <ContributorLarge
        contributor={contributor}
        onSubscribe={subscribe}
        onUnsubscribe={unsubscribe}
      />
      <ProfileNoticeList loading={noticesLoading} notices={notices} />
    </>
  );
};

export default Profile;
