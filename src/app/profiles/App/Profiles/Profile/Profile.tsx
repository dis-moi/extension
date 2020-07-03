import React, { useState, MouseEvent } from 'react';
import styled from 'styled-components';
import { ContributorId, StatefulContributor } from 'app/lmem/contributor';
import { Notice } from 'app/lmem/notice';
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
import { Download } from 'components/atoms/icons';
import SimilarProfiles from './SimilarProfiles';
import FeaturedNotice from './FeaturedNotice';
import ProfileIntro from './ProfileIntro';
import ProfileNoticeList from './ProfileNoticeList';
import CenterContainer from 'components/atoms/CenterContainer';
import SubscribePopin from '../SubscribePopin';
import NotConnectedPopin, {
  NotConnectedPopinState
} from '../NotConnectedPopin';

const MainCol = styled.div`
  ${CenterContainer} {
    margin-top: 20px;

    ${Button} {
      font-size: 12px;
    }
  }
`;

const Aside = styled(Sidebar)`
    margin-top: ${props => props.theme.marginM};
    
  ${SimilarProfiles} + ${CenterContainer} {
    margin-top: -30px;
  }
`;

export const SidebarBox = styled(Box)`
  margin-bottom: ${props => props.theme.marginL};
  padding: 10px;

  ${Button} {
    margin-top: 0;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 15px;
  }

  ${ButtonWithIcon} {
    margin: 16px auto 0;
  }
`;

const SidebarBoxWithAction = styled(SidebarBox)`
  @media (max-width: ${props => props.theme.desktopWidth}) {
    display: none;
  }
`;

export interface ProfileProps {
  contributor?: StatefulContributor;
  noticesLoading?: boolean;
  notices: Notice[];
  featuredNotice?: Notice;
  subscribe: (contributorId: ContributorId) => void;
  unsubscribe: (contributorId: ContributorId) => void;
  similarContributors: StatefulContributor[];
  contributors: StatefulContributor[];
  contributorsLoading?: boolean;
  connected?: boolean;
  addToBrowser: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Profile = ({
  contributor,
  subscribe,
  unsubscribe,
  noticesLoading,
  featuredNotice,
  notices,
  similarContributors,
  contributors,
  contributorsLoading,
  connected,
  addToBrowser
}: ProfileProps) => {
  const [notConnectedPopinState, setNotConnectedPopinState] = useState<
    NotConnectedPopinState
  >({ opened: false, contributor });
  const [subscribePopinOpened, setSubscribePopinOpened] = useState(false);

  if (typeof contributor?.loading === 'undefined') {
    return null;
  }

  if (!contributor?.loading && !contributor) {
    return <Error />;
  }

  const handleSubscribe = (contributor?: StatefulContributor) => () => {
    if (contributor) {
      if (connected) {
        subscribe(contributor.id);
      } else {
        setNotConnectedPopinState({ opened: true, contributor });
      }
    }
  };

  const handleUnsubscribe = (contributor?: StatefulContributor) => () => {
    if (contributor) {
      if (connected) {
        unsubscribe(contributor.id);
      } else {
        setNotConnectedPopinState({ opened: true, contributor });
      }
    }
  };

  const handleSeeNoticeInContext = (notice?: Notice) => () => {
    if (connected) {
      if (contributor?.subscribed) {
        if (notice && notice.exampleUrl) {
          window.open(notice.exampleUrl, '_blank');
        }
      } else {
        setSubscribePopinOpened(true);
      }
    } else {
      setNotConnectedPopinState({ opened: true, contributor });
    }
  };

  return (
    <TwoColumns>
      <MainCol>
        <ProfileIntro
          loading={contributor?.loading}
          contributor={contributor}
          subscribe={handleSubscribe(contributor)}
          unsubscribe={handleUnsubscribe(contributor)}
        />
        <Title2>
          La contribution phare {contributor && `de ${contributor.name}`}
        </Title2>
        <FeaturedNotice
          loading={noticesLoading}
          notice={featuredNotice}
          seeInContext={handleSeeNoticeInContext(featuredNotice)}
        />

        <Title2>Ses dernières contributions</Title2>
        <ProfileNoticeList
          loading={noticesLoading}
          notices={notices}
          seeNoticeInContext={handleSeeNoticeInContext}
        />
      </MainCol>

      <Aside>
        {connected === false && (
          <SidebarBoxWithAction>
            <Paragraph>
              DisMoi permet aux internautes, médias et experts de vous informer
              directement sur les pages web que vous visitez.
            </Paragraph>

            <ButtonWithIcon className="bulle-installer">
              Ajouter à mon navigateur <Download />
            </ButtonWithIcon>
          </SidebarBoxWithAction>
        )}
        <SimilarProfiles
          similarContributors={similarContributors}
          contributors={contributors}
          loading={contributorsLoading}
          subscribe={handleSubscribe}
          unsubscribe={handleUnsubscribe}
        />
      </Aside>

      <NotConnectedPopin
        {...notConnectedPopinState}
        setOpened={(opened: boolean) =>
          setNotConnectedPopinState({
            ...notConnectedPopinState,
            opened
          })
        }
        addToBrowser={(e: MouseEvent<HTMLButtonElement>) => {
          setNotConnectedPopinState({
            ...notConnectedPopinState,
            opened: false
          });
          addToBrowser(e);
        }}
      />

      {contributor && (
        <SubscribePopin
          contributor={contributor}
          subscribe={subscribe}
          unsubscribe={unsubscribe}
          opened={subscribePopinOpened}
          setOpened={setSubscribePopinOpened}
        />
      )}
    </TwoColumns>
  );
};

export default Profile;
