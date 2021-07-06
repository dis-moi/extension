import React from 'react';
import styled from 'styled-components';
import { StatefulContributor } from 'libs/domain/contributor';
import {
  ContributorCard,
  ContributorInfos,
  ContributorWrapper,
  StatsWrapper
} from 'components/atoms/Contributor';
import { LinkIcon } from 'components/atoms/icons';
import ExternalLink from 'components/atoms/Link/ExternalLink';
import UserName from 'components/atoms/UserName/UserName';
import Avatar from 'components/molecules/Avatar/Avatar';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import { Anchor } from 'components/atoms';
import { As } from 'types';
import ProfileBanner from './ProfileBanner';

const ProfileIntroContent = styled.section`
  position: relative;
  margin-bottom: 40px;

  ${ContributorLarge} {
    &${ContributorCard} {
      box-sizing: border-box;
      min-height: 135px;
      padding: 20px;
      border: none;
      border-top-left-radius: 0;
      border-top-right-radius: 0;

      & > :last-child {
        margin-bottom: 0;
      }
    }

    ${ContributorWrapper} {
      display: flex;
      flex-wrap: wrap;

      @media (max-width: ${props => props.theme.tabletWidth}) {
        flex-wrap: nowrap;

        ${Avatar} {
          margin-top: 0;
          width: 70px;
          height: 70px;

          & > img {
            max-width: initial;
            width: 70px;
            height: auto;
          }
        }
      }
    }

    ${Avatar} {
      width: 90px;
      height: 90px;
      margin-top: -100px;
      border: 5px solid #fff;

      & > img {
        max-width: inherit;
        width: 90px;
        height: 90px;
      }
    }

    ${ContributorInfos} {
      flex-basis: 100%;
      margin: 0;

      ${UserName} {
        display: inline;

        ${Anchor} {
          display: block;
          font-size: 22px;
          line-height: 1.2;
          color: ${props => props.theme.colorBlack};
          white-space: normal;
        }
      }

      ${StatsWrapper} {
        grid-row: 2 /3;

        & + div {
          margin-top: -5px;
        }
      }

      @media (max-width: ${props => props.theme.tabletWidth}) {
        display: flex;
        margin-left: 16px;

        ${StatsWrapper} {
          & + div {
            margin-top: 15px;
          }
        }
      }
    }
  }
`;

export interface ProfileIntroProps {
  contributor?: StatefulContributor;
  subscribe: () => void;
  unsubscribe: () => void;
  loading?: boolean;
  usernameAs?: As;
}

export const ProfileIntro = ({
  contributor,
  subscribe,
  unsubscribe,
  loading,
  usernameAs
}: ProfileIntroProps) => {
  return (
    <>
      <ProfileBanner contributor={contributor} />
      <ProfileIntroContent>
        <ContributorLarge
          contributor={contributor}
          onSubscribe={subscribe}
          onUnsubscribe={unsubscribe}
          loading={loading}
          avatarSize="large"
          usernameAs={usernameAs}
        >
          {contributor && !!contributor.website && (
            <ExternalLink href={contributor.website}>
              <LinkIcon /> {contributor.website}
            </ExternalLink>
          )}
        </ContributorLarge>
      </ProfileIntroContent>
    </>
  );
};

export default ProfileIntro;
