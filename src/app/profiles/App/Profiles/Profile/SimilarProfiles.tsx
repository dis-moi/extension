import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StatefulContributor } from 'app/lmem/contributor';
import ContributorCompact from 'components/organisms/Contributor/ContributorCompact';
import { SidebarBox } from './Profile';
import { LoadingBig } from 'components/atoms/icons';
import {
  CenterContainer,
  Link,
  LoadingRotator,
  Title2
} from 'components/atoms';
import Avatar from 'components/molecules/Avatar/Avatar';
import UserName from 'components/atoms/UserName/UserName';
import pathToContributor from '../../pathToContributor';

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
  className
}: SimilarProfilesProps) => {
  const [initialSimilarContributors, setInitialSimilarContributors] = useState(
    similarContributors
  );

  useEffect(() => {
    if (initialSimilarContributors.length === 0)
      setInitialSimilarContributors(similarContributors);
  }, [similarContributors, contributors]);

  if (loading) {
    return (
      <Loader>
        <LoadingRotator>
          <LoadingBig />
        </LoadingRotator>
      </Loader>
    );
  }

  if (initialSimilarContributors.length === 0) {
    return null;
  }

  return (
    <>
      <Title2>Profils similaires</Title2>
      <SidebarBox className={className}>
        {initialSimilarContributors
          .map(initialSimilarContributor => ({
            ...initialSimilarContributor,
            ...contributors.find(
              contributor => contributor.id === initialSimilarContributor.id
            )
          }))
          .map(contributor => (
            <ContributorCompact
              key={contributor.id}
              contributor={contributor}
              onSubscribe={subscribe(contributor)}
              onUnsubscribe={unsubscribe(contributor)}
              to={pathToContributor(contributor)}
            />
          ))}
      </SidebarBox>
      <CenterContainer>
        <Link to="/informateurs">Voir tout</Link>
      </CenterContainer>
    </>
  );
};

export default styled(SimilarProfiles)`
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
      color: ${props => props.theme.secondaryColor};
      text-transform: uppercase;
      text-decoration: underline;
      transition: all 0.2s ease-in-out;

      &:hover {
        color: ${props => props.theme.Button.hover};
      }
    }
  }

  @media (max-width: ${props => props.theme.desktopWidth}) {
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
      border-radius: ${props => props.theme.radius};

      & + ${ContributorCompact} {
        margin-left: ${props => props.theme.marginS};
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

        ${Link} {
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
