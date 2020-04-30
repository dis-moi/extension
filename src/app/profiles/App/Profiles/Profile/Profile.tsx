import React, { useEffect } from 'react';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import { StatefulContributor } from 'app/lmem/contributor';
import { Notice } from 'app/lmem/notice';
import { Title2 } from 'components/atoms';
import { Loading } from 'components/atoms/icons';
import Error from '../../Error';
import ProfileNoticeList from './ProfileNoticeList';
import { trilean } from 'types';
import FeaturedNotice from './FeaturedNotice';
import { Background, PageContainer } from '../Components';

export interface ProfileProps {
  loading: trilean;
  contributor?: StatefulContributor;
  noticesLoading: trilean;
  notices: Notice[];
  featuredNotice?: Notice;
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
  featuredNotice,
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
      <Background>
        <PageContainer>
          <ContributorLarge
            contributor={contributor}
            onSubscribe={subscribe}
            onUnsubscribe={unsubscribe}
          />
          <Title2>La contribution phare de Lutangar</Title2>
          <FeaturedNotice loading={noticesLoading} notice={featuredNotice} />
          <ProfileNoticeList loading={noticesLoading} notices={notices} />
        </PageContainer>
      </Background>
    </>
  );
};

export default Profile;
