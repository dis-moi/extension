import React from 'react';
import styled from 'styled-components';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import {
  ContributorCard,
  ContributorInfos,
  ContributorWrapper,
  StatsWrapper
} from 'components/atoms/Contributor/index';
import UserName from 'components/atoms/UserName/UserName';
import Avatar from 'components/molecules/Avatar/Avatar';
import ExternalLink from 'components/atoms/Link/ExternalLink';
import { StatefulContributor } from 'app/lmem/contributor';
import { LinkIcon } from 'components/atoms/icons';

const ProfileIntroContent = styled.section`
  margin-bottom: 40px;

  ${ContributorLarge} {
    &${ContributorCard} {
      padding: 20px;
      border: none;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    ${ContributorWrapper} {
      display: block;
    }

    ${Avatar} {
      margin-top: -130px;
      border: 5px solid #fff;

      &,
      & > img {
        width: 120px;
        height: 120px;
      }
    }

    ${ContributorInfos} {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: 1fr 1fr;
      grid-column-gap: 24px;
      margin: 10px 0 0;

      ${UserName} {
        display: inline;
      }

      ${StatsWrapper} {
        grid-row: 2 /3;
      }
    }
  }
`;

const ProfileBanner = styled.div`
  min-height: 200px;
  background-color: red;
`;

export interface ProfileIntroProps {
  contributor: StatefulContributor;
  subscribe: () => void;
  unsubscribe: () => void;
}

export const ProfileIntro = ({
  contributor,
  subscribe,
  unsubscribe
}: ProfileIntroProps) => {
  return (
    <>
      <ProfileBanner />
      <ProfileIntroContent>
        <ContributorLarge
          contributor={contributor}
          onSubscribe={subscribe}
          onUnsubscribe={unsubscribe}
          link={
            <ExternalLink href={contributor.contribution.example.matchingUrl}>
              <LinkIcon /> My website
            </ExternalLink>
          }
        />
      </ProfileIntroContent>
    </>
  );
};

export default ProfileIntro;
