import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { StatefulContributor } from '@dismoi/domain/contributor';
import {
  CenterContainer,
  Link,
  LoadingRotator,
  Title2,
} from '@dismoi/ui/atoms';
import { LoadingBig } from '@dismoi/ui/atoms/icons';
import UserName from '@dismoi/ui/atoms/UserName/UserName';
import Avatar from '@dismoi/ui/molecules/Avatar/Avatar';
import SidebarBox from '@dismoi/ui/molecules/SidebarBox/SidebarBox';
import ContributorCompact from '@dismoi/ui/organisms/Contributor/ContributorCompact';
import ContributorNameLink from '@dismoi/ui/organisms/Contributor/ContributorNameLink';
import pathToContributor from '../pathToContributor';
import withConnect from './withConnect';

interface SimilarProfilesProps {
  loading?: boolean;
  similarContributors: StatefulContributor[];
  contributors: StatefulContributor[];
  subscribe: (contributor: StatefulContributor) => () => void;
  unsubscribe: (contributor: StatefulContributor) => () => void;
  className?: string;
}

const Loader = styled(CenterContainer)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SimilarProfiles = ({
  loading = false,
  similarContributors,
  contributors,
  subscribe,
  unsubscribe,
  className,
}: SimilarProfilesProps) => {
  const [initialSimilarContributors, setInitialSimilarContributors] =
    useState(similarContributors);

  useEffect(() => {
    if (initialSimilarContributors.length === 0)
      setInitialSimilarContributors(similarContributors);
  }, [similarContributors, contributors]);

  const { t } = useTranslation();

  if (loading) {
    return (
      <Loader>
        <LoadingRotator>
          <LoadingBig />
        </LoadingRotator>
      </Loader>
    );
  }

  if (!initialSimilarContributors || initialSimilarContributors.length === 0) {
    return null;
  }

  return (
    <>
      <Title2>{t('profiles:common.similar_profiles')}</Title2>
      <SidebarBox className={className}>
        {initialSimilarContributors
          .map((initialSimilarContributor) => ({
            ...initialSimilarContributor,
            ...contributors.find(
              (contributor) => contributor.id === initialSimilarContributor.id,
            ),
          }))
          .map((contributor) => (
            <ContributorCompact
              key={contributor.id}
              contributor={contributor}
              onSubscribe={subscribe(contributor)}
              onUnsubscribe={unsubscribe(contributor)}
              to={pathToContributor(
                contributor,
                t('path.profiles.contributors'),
              )}
            />
          ))}
      </SidebarBox>
      <CenterContainer>
        <Link to={t('path.profiles.contributors')}>
          {t('profiles:action.see_all')}
        </Link>
      </CenterContainer>
    </>
  );
};

export default styled(withRouter(withConnect(SimilarProfiles)))`
  ${ContributorCompact} {
    &:first-child {
      border-top: none;
    }
    &:last-child {
      border-bottom: none;
    }
  }

  & + ${CenterContainer} {
    ${Link} {
      font-weight: bold;
      color: ${(props) => props.theme.secondaryColor};
      text-transform: uppercase;
      text-decoration: underline;
      transition: all 0.2s ease-in-out;

      &:hover {
        color: ${(props) => props.theme.Button.hover};
      }
    }
  }

  ${Link} {
    &::after {
      content: none;
    }
  }

  @media (max-width: ${(props) => props.theme.desktopWidth}) {
    display: flex;
    flex-wrap: nowrap;
    background-color: transparent !important;
    overflow-x: scroll;

    ${ContributorCompact} {
      flex-basis: 146px;
      flex-direction: column;
      justify-content: center;
      padding-right: 10px;
      padding-left: 10px;
      text-align: center;
      background-color: white;
      border: none !important;
      border-radius: ${(props) => props.theme.radius};

      & + ${ContributorCompact} {
        margin-left: ${(props) => props.theme.marginS};
      }

      ${Avatar} {
        margin-bottom: 5px;

        &,
        img {
          width: 70px;
          height: 70px;
        }
      }

      ${UserName} {
        margin-bottom: 10px;

        ${ContributorNameLink} {
          display: block;
          font-size: 16px;
          white-space: normal;
        }
      }

      ${Link} {
        margin-top: 10px;
        font-size: 18px;
      }
    }
  }
`;
