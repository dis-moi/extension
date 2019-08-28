import React from 'react';

import styled from 'styled-components';
import Logo from 'components/atoms/icons/Logo';
import ContributorNav from 'components/organisms/ContributorNav/ContributorNav';
import Contributor from 'components/organisms/Contributor/ContributorLarge';
import Wrapper from './Wrapper';
import BottomLine from './BottomLine';
import { generateContributor } from '../../../../../test/fakers/generateContributor';

const BullesLogo = styled.div`
  width: 90px;
  height: auto;
  margin-top: 30px;
  margin-bottom: 30px;
`;

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
    <BullesLogo>
      <Logo />
    </BullesLogo>

    <ContributorsWidth>
      <ContributorNav />

      <ContributorsList>
        <Contributor contributor={generateContributor()} />
        <Contributor contributor={generateContributor()} />
        <Contributor contributor={generateContributor()} />
        <Contributor contributor={generateContributor()} />
        <Contributor contributor={generateContributor()} />
        <Contributor contributor={generateContributor()} />
        <Contributor contributor={generateContributor()} />
        <Contributor contributor={generateContributor()} />
        <Contributor contributor={generateContributor()} />
        <Contributor contributor={generateContributor()} />
        <Contributor contributor={generateContributor()} />
        <Contributor contributor={generateContributor()} />
        <Contributor contributor={generateContributor()} />
      </ContributorsList>
    </ContributorsWidth>

    <BottomLine />
  </Wrapper>
);

export default Settings;
