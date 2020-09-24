import React from 'react';
import styled from 'styled-components';
import { Link } from '../../atoms';

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

const ContributorListItem = styled.li`
  cursor: hand;

  &:not(:first-of-type) {
    margin-left: 16px;
  }
`;

const SeeContributor = styled.button`
  display: block;
  width: 62px;
  height: 62px;
  background-color: ${props => props.theme.badge};
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

const PopinBottomBar = () => {
  return (
    <PopinBottomBarContainer>
      <Link>En savoir plus</Link> sur DisMoi et ses informateurs
      <ContributorList>
        <ContributorListItem>
          <SeeContributor>jean mi</SeeContributor>
        </ContributorListItem>
        <ContributorListItem>
          <SeeContributor>jean mi</SeeContributor>
        </ContributorListItem>
        <ContributorListItem>
          <SeeContributor>jean mi</SeeContributor>
        </ContributorListItem>
        <ContributorListItem>
          <SeeContributor>jean mi</SeeContributor>
        </ContributorListItem>
        <ContributorListItem>
          <SeeContributor>jean mi</SeeContributor>
        </ContributorListItem>
        <ContributorListItem>
          <SeeContributor>jean mi</SeeContributor>
        </ContributorListItem>
      </ContributorList>
    </PopinBottomBarContainer>
  );
};

export default PopinBottomBar;
