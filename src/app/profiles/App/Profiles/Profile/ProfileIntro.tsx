import React from 'react';
import styled from 'styled-components';
import { StatefulContributor } from 'app/lmem/contributor';
import {
  ContributorCard,
  ContributorInfos,
  ContributorWrapper,
  StatsWrapper
} from 'components/atoms/Contributor/index';
import { LinkIcon } from 'components/atoms/icons';
import ExternalLink from 'components/atoms/Link/ExternalLink';
import UserName from 'components/atoms/UserName/UserName';
import Avatar from 'components/molecules/Avatar/Avatar';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import { Anchor } from 'components/atoms';

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
      grid-column-gap: 24px;
      margin: 10px 0 0;

      ${UserName} {
        display: inline;

        ${Anchor} {
          display: block;
          font-size: 22px;
          color: ${props => props.theme.titleColor};
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
        display: block;

        ${StatsWrapper} {
          & + div {
            margin-top: 15px;
          }
        }
      }
    }
  }
`;

const ProfileBanner = styled.div`
  min-height: 200px;
  background-color: red;
`;

export interface ProfileIntroProps {
  contributor?: StatefulContributor;
  subscribe: () => void;
  unsubscribe: () => void;
  loading?: boolean;
}

export const ProfileIntro = ({
  contributor,
  subscribe,
  unsubscribe,
  loading
}: ProfileIntroProps) => {
  return (
    <>
      <ProfileBanner />
      <ProfileIntroContent>
        <ContributorLarge
          contributor={contributor}
          onSubscribe={subscribe}
          onUnsubscribe={unsubscribe}
          loading={loading}
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
