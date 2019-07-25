import React from 'react';

import styled, { css } from 'styled-components';
import ContributorNav from 'components/organisms/ContributorNav/ContributorNav';
import Contributor from 'components/organisms/Contributor/ContributorLarge';

const ContributorsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 40px;
  grid-row-gap: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Settings = () => (
  <>
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
  </>
);

export default Settings;
