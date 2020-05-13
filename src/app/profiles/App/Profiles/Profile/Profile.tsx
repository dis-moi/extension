import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StatefulContributor } from 'app/lmem/contributor';
import { Notice } from 'app/lmem/notice';
import { trilean } from 'types';
import Error from '../../Error';
import {
  BackgroundButton,
  Box,
  Button,
  ButtonWithIcon,
  Paragraph,
  Sidebar,
  Title2,
  TwoColumns
} from 'components/atoms';
import { Download, Loading } from 'components/atoms/icons';
import SimilarProfiles from './SimilarProfiles';
import FeaturedNotice from './FeaturedNotice';
import ProfileIntro from './ProfileIntro';
import ProfileNoticeList from './ProfileNoticeList';
import Popin, {
  PopinParagraph
} from '../../../../../components/molecules/Popin/Popin';

const MainCol = styled.div``;

const SidebarBox = styled(Box)`
  margin-bottom: 40px;
  padding: 10px;

  ${Button} {
    font-size: 13px;
  }

  ${ButtonWithIcon} {
    margin: 16px auto 0;
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
  const [popinOpened, setPopinOpened] = useState(false);

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
    <TwoColumns>
      <MainCol>
        <ProfileIntro
          contributor={contributor}
          subscribe={() => setPopinOpened(true)}
          unsubscribe={unsubscribe}
        />

        <Title2>La contribution phare de Lutangar</Title2>

        <FeaturedNotice loading={noticesLoading} notice={featuredNotice} />

        <ProfileNoticeList loading={noticesLoading} notices={notices} />
      </MainCol>

      <Sidebar>
        <SidebarBox>
          <Paragraph>
            DisMoi permet aux internautes, médias et experts de vous informer
            directement sur les pages web que vous visitez.
          </Paragraph>

          <ButtonWithIcon>
            Ajouter à mon navigateur <Download />
          </ButtonWithIcon>
        </SidebarBox>

        <Title2>Profils similaires</Title2>
        <SidebarBox>
          <SimilarProfiles />
        </SidebarBox>
      </Sidebar>
      <Popin opened={popinOpened} setOpened={setPopinOpened}>
        <PopinParagraph>
          Pour voir les contributions de {contributor.name}, veuillez d’abord
          ajouter Dismoi à votre navigateur.
        </PopinParagraph>

        <BackgroundButton>Ajouter Dismoi à mon navigateur</BackgroundButton>
      </Popin>
    </TwoColumns>
  );
};

export default Profile;
