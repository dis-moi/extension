import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StatefulContributor } from 'app/lmem/contributor';
import ContributorCompact from 'components/organisms/Contributor/ContributorCompact';
import { SidebarBox } from './Profile';
import { LogoLetter } from 'components/atoms/icons';
import {
  Button,
  CenterContainer,
  Link,
  LoadingRotator,
  Title2
} from 'components/atoms';
import StatsWrapper from 'components/atoms/Contributor/StatsWrapper';
import Avatar from '../../../../../components/molecules/Avatar/Avatar';
import UserName from '../../../../../components/atoms/UserName/UserName';
import Stat from '../../../../../components/atoms/Stat/Stat';

interface SimilarProfilesProps {
  loading?: boolean;
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
  contributors,
  subscribe,
  unsubscribe,
  className
}: SimilarProfilesProps) => {
  const [initialContributors, setInitialSuggestions] = useState(contributors);

  useEffect(() => {
    if (initialContributors.length === 0) setInitialSuggestions(contributors);
  }, [contributors]);

  if (loading) {
    return (
      <Loader>
        <LoadingRotator>
          <LogoLetter />
        </LoadingRotator>
      </Loader>
    );
  }

  if (initialContributors.length === 0) {
    return null;
  }

  return (
    <>
      <Title2>Profils similaires</Title2>
      <SidebarBox className={className}>
        {initialContributors.map(contributor => (
          <ContributorCompact
            key={contributor.id}
            contributor={contributor}
            onSubscribe={subscribe(contributor)}
            onUnsubscribe={unsubscribe(contributor)}
          />
        ))}
      </SidebarBox>
      <CenterContainer>
        <Button to="/les-contributeurs">Voir tout</Button>
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

    ${StatsWrapper} {
      justify-content: center;
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

      ${Stat} {
        justify-content: center;
        width: 100%;
        font-size: 14px;
      }

      ${Button} {
        margin-top: 10px;
        font-size: 18px;
      }
    }
  }
`;
