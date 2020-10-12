import React, { useState, MouseEvent } from 'react';
import styled from 'styled-components';
import {
  Contributor,
  ContributorId,
  StatefulContributor
} from 'app/lmem/contributor';
import { NoticeWithContributor } from 'app/lmem/notice';
import Error from '../../Error';
import {
  Button,
  Paragraph,
  Sidebar,
  Title2,
  TwoColumns
} from 'components/atoms';
import SimilarProfiles from '../../../SimilarProfiles';
import FeaturedNotice from './FeaturedNotice';
import ProfileIntro from './ProfileIntro';
import ProfileNoticeList from './ProfileNoticeList';
import CenterContainer from 'components/atoms/CenterContainer';
import SubscribePopin from '../SubscribePopin';
import NotConnectedPopin, {
  NotConnectedPopinState
} from '../NotConnectedPopin';
import {
  AddToBrowserMessageBox,
  PrivacyMessageBox
} from 'components/molecules/SidebarBox';

export const MainCol = styled.div`
  ${CenterContainer} {
    margin-top: 20px;

    ${Button} {
      font-size: 12px;
    }
  }

  ${Paragraph} {
    line-height: 1.2;
    max-height: calc(3 * 1.2 * 1em); //exact number of lines
    overflow: hidden;

    p + p {
      display: none;
    }

    p {
      display: inline-block;
      max-height: calc(3 * 1.2 * 1em); //one more line
      position: relative;
      margin: 0;
      padding-bottom: 0;

      // webkit solution to multi-line text overflow
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;

      &:before {
        // for the ellipsis
        background: #fff; // fallback for old IE
        background: linear-gradient(
          to right,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 1) 50%
        );
        bottom: 1.2 * 1em;
        content: '\\02026';
        height: 1.2 * 1em;
        position: absolute;
        right: 0;
        text-align: right;
        width: 4em;
      }

      &:after {
        // to cover all but the last line of text
        background: #fff;
        content: attr(data-text);
        left: 0;
        height: (2 - 1) * 1.2 * 1em;
        overflow: hidden;
        position: absolute;
        top: 0;
        width: 100%;
      }

      @supports (-webkit-line-clamp: 2) {
        &:before,
        &:after {
          content: none;
        }
      }
    }
  }
`;

export const Aside = styled(Sidebar)`
  margin-top: ${props => props.theme.marginM};
    
  ${SimilarProfiles} + ${CenterContainer} {
    margin-top: -30px;
  }
  
  ${SimilarProfiles} ${Button} {
    min-width: 110px;
    padding-left: 5px;
    padding-right: 5px;
  }
`;

export interface ProfileProps {
  contributor?: StatefulContributor;
  noticesLoading?: boolean;
  notices: NoticeWithContributor[];
  featuredNotice?: NoticeWithContributor;
  subscribe: (contributorId: ContributorId) => void;
  unsubscribe: (contributorId: ContributorId) => void;
  fetchMoreNotices: () => void | undefined;
  fetchedAll: boolean;
  contributors: StatefulContributor[];
  connected?: boolean;
  addToBrowser: (e: MouseEvent<HTMLButtonElement>) => void;
  goToContributor: (contributor: Contributor) => void;
}

export const Profile = ({
  contributor,
  subscribe,
  unsubscribe,
  noticesLoading,
  featuredNotice,
  notices,
  connected,
  addToBrowser,
  goToContributor,
  fetchMoreNotices,
  fetchedAll,
  contributors
}: ProfileProps) => {
  const [notConnectedPopinState, setNotConnectedPopinState] = useState<
    NotConnectedPopinState
  >({
    opened: false,
    contributor
  });
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

  const handleSeeNoticeInContext = (notice?: NoticeWithContributor) => () => {
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
          usernameAs={'h1'}
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
          fetchMoreNotices={fetchMoreNotices}
          fetchedAll={fetchedAll}
        />
      </MainCol>

      <Aside>
        {connected === false && <AddToBrowserMessageBox />}
        {connected && <PrivacyMessageBox />}

        <SimilarProfiles
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
        contributors={contributors}
        onContributorClick={goToContributor}
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
