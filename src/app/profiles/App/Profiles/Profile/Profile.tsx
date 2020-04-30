import React, { useEffect } from 'react';
import { StatefulContributor } from 'app/lmem/contributor';
import { Notice } from 'app/lmem/notice';
import { trilean } from 'types';
import Error from '../../Error';
import { Title2 } from 'components/atoms';
import { Loading } from 'components/atoms/icons';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import { Background, PageContainer, ProfileIntro } from '../Components';
import FeaturedNotice from './FeaturedNotice';
import ProfileNoticeList from './ProfileNoticeList';
import SuggestionsSidebar from '../../../../options/App/Settings/SubscriptionsScreen/SuggestionsSidebar';

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
          <ProfileIntro>
            <ContributorLarge
              contributor={contributor}
              onSubscribe={subscribe}
              onUnsubscribe={unsubscribe}
            />
          </ProfileIntro>
          <Title2>La contribution phare de Lutangar</Title2>
          <FeaturedNotice loading={noticesLoading} notice={featuredNotice} />
          <ProfileNoticeList loading={noticesLoading} notices={notices} />
        </PageContainer>
        <SuggestionsSidebar
          subscriptions={[]}
          suggestions={[contributor, contributor]}
          allContributors={[contributor, contributor]}
          subscribe={() => {}}
          unsubscribe={() => {}}
          goToSuggestions={() => {}}
        />
      </Background>
    </>
  );
};

export default Profile;
