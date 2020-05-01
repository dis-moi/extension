import React, { useEffect } from 'react';
import styled from 'styled-components';
import { StatefulContributor } from 'app/lmem/contributor';
import { Notice } from 'app/lmem/notice';
import { trilean } from 'types';
import Error from '../../Error';
import {
  Box,
  Button,
  ButtonWithIcon,
  Paragraph,
  Sidebar,
  Title2,
  TwoColumns
} from 'components/atoms';
import { Loading } from 'components/atoms/icons';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import { Background, PageContainer, ProfileIntro } from '../Components';
import FeaturedNotice from './FeaturedNotice';
import ProfileNoticeList from './ProfileNoticeList';

import SuggestionsSidebar from '../../../../options/App/Settings/SubscriptionsScreen/SuggestionsSidebar';

const MainCol = styled.div``;

const SidebarBox = styled(Box)`
  margin-bottom: 40px;
  padding: 10px;

  ${Button} {
    font-size: 13px;
  }
`;

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
          <TwoColumns>
            <MainCol>
              <ProfileIntro>
                <ContributorLarge
                  contributor={contributor}
                  onSubscribe={subscribe}
                  onUnsubscribe={unsubscribe}
                />
              </ProfileIntro>
              <Title2>La contribution phare de Lutangar</Title2>
              <FeaturedNotice
                loading={noticesLoading}
                notice={featuredNotice}
              />
              <ProfileNoticeList loading={noticesLoading} notices={notices} />
            </MainCol>
            <Sidebar>
              <SidebarBox>
                <Paragraph>
                  DisMoi permet aux internautes, médias et experts de vous
                  informer directement sur les pages web que vous visitez.
                </Paragraph>
                <ButtonWithIcon>Ajouter à mon navigateur</ButtonWithIcon>
              </SidebarBox>
              <Title2>Profils similaires</Title2>
              <SidebarBox>
                <SuggestionsSidebar
                  subscriptions={[]}
                  suggestions={[contributor, contributor]}
                  allContributors={[contributor, contributor]}
                  subscribe={() => {}}
                  unsubscribe={() => {}}
                  goToSuggestions={() => {}}
                />
              </SidebarBox>
            </Sidebar>
          </TwoColumns>
        </PageContainer>
      </Background>
    </>
  );
};

export default Profile;
