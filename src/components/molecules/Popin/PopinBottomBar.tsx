import React from 'react';
import styled from 'styled-components';
import { Link } from 'components/atoms';
import { Contributor, StatefulContributor } from 'app/lmem/contributor';
import ContributorListItem from 'components/atoms/ContributorListItem';
import InteractiveAvatar from '../InteractiveAvatar';

const PopinBottomBarContainer = styled.div`
  width: 100%;
  margin: 30px -60px -20px;
  padding: 36px 0;
  font-size: 16px;
  font-style: italic;
  text-align: center;
  background-color: ${props => props.theme.contributorGrey};
  border-radius: 0 0 ${props => props.theme.radius}
    ${props => props.theme.radius};
`;

const ContributorList = styled.ul`
  display: flex;
  justify-content: center;
  margin: 20px 0 0;
  padding-left: 0;
  list-style-type: none;
`;

interface PopinBottomBarProps {
  contributors: StatefulContributor[];
  onContributorClick: (contributor: Contributor) => void;
}

const PopinBottomBar = ({
  contributors,
  onContributorClick
}: PopinBottomBarProps) => {
  if (!contributors) {
    return null;
  }

  return (
    <PopinBottomBarContainer>
      <Link>En savoir plus</Link> sur DisMoi et ses informateurs
      <ContributorList>
        {contributors.map(contributor => (
          <ContributorListItem key={`contributorListItem[${contributor.id}]`}>
            <InteractiveAvatar
              onClick={() => onContributorClick(contributor)}
              contributor={contributor}
              size="small"
            />
          </ContributorListItem>
        ))}
      </ContributorList>
    </PopinBottomBarContainer>
  );
};

export default PopinBottomBar;
