import React from 'react';

import styled, { css } from 'styled-components';
import ContributorNav from 'components/organisms/ContributorNav/ContributorNav';
import Contributor from 'components/organisms/Contributor/ContributorLarge';
import Wrapper from './Wrapper';
import BottomLine from './BottomLine';

const ContributorsWidth = styled.section`
  padding-bottom: 250px;
`;

const ContributorsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 40px;
  grid-row-gap: 40px;
`;

const Settings = () => (
  <Wrapper>
    <ContributorsWidth>
      <ContributorNav />

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

    <BottomLine />
  </Wrapper>
);

export default Settings;
