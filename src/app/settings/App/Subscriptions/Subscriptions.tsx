import React from 'react';

import styled, { css } from 'styled-components';
import Wrapper from './Wrapper';
import Button from 'components/atoms/Button';
import CenterContainer from 'components/atoms/CenterContainer';
import ContributorNav from 'components/organisms/ContributorNav/ContributorNav';
import Contributor from 'components/organisms/Contributor/ContributorLarge';
import ContributorCompact from 'components/organisms/Contributor/ContributorCompact';

const ContributorsWidth = styled.section``;

const Contributors2col = styled.div`
  display: grid;
  grid-column-gap: 55px;
  grid-template-columns: auto 290px;
`;

const ContributorsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 40px;
  grid-row-gap: 40px;
`;

const ContributorsAside = styled.aside`
  ${Button} {
    margin-top: 10px;
  }
`;
const ContributorsAsideTitle = styled.h2`
  margin: 0 0 5px;
  font-size: 20px;
  color: ${props => props.theme.activeColor};
  font-weight: bold;
`;

const Settings = () => (
  <Wrapper>
    <ContributorNav />

    <Contributors2col>
      <ContributorsWidth>
        <ContributorsList>
          <Contributor />
          <Contributor />
          <Contributor />
          <Contributor />
          <Contributor />
          <Contributor />
          <Contributor />
          <Contributor />
          <Contributor />
          <Contributor />
          <Contributor />
          <Contributor />
          <Contributor />
        </ContributorsList>
      </ContributorsWidth>

      <ContributorsAside>
        <ContributorsAsideTitle>Suggestions</ContributorsAsideTitle>

        <ContributorCompact />
        <ContributorCompact />
        <ContributorCompact />
        <ContributorCompact />
        <ContributorCompact />
        <ContributorCompact />

        <CenterContainer>
          <Button>Voir plus</Button>
        </CenterContainer>
      </ContributorsAside>
    </Contributors2col>
  </Wrapper>
);

export default Settings;
