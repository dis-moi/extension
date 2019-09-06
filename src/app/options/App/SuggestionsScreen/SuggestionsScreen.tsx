import React from 'react';
import styled from 'styled-components';
import { Contributor } from 'app/lmem/contributor';
import Logo from 'components/atoms/icons/Logo';
import ContributorNav from 'components/organisms/ContributorNav/ContributorNav';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import Wrapper from '../ScreenWrapper';
import BottomLine from './BottomLine';
import withConnect from './withConnect';

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

interface Props {
  suggestions: Contributor[];
}

const SuggestionsScreen = ({ suggestions }: Props) => (
  <Wrapper>
    <BullesLogo>
      <Logo />
    </BullesLogo>

    <ContributorsWidth>
      <ContributorNav />

      <ContributorsList>
        {suggestions.map(contributor => (
          <ContributorLarge key={contributor.id} contributor={contributor} />
        ))}
      </ContributorsList>
    </ContributorsWidth>

    <BottomLine />
  </Wrapper>
);

export default withConnect(SuggestionsScreen);
