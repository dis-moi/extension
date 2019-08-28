import React from 'react';
import styled from 'styled-components';
import { Contributor } from 'app/lmem/contributor';
import Logo from 'components/atoms/icons/Logo';
import Button from 'components/atoms/Button';
import CenterContainer from 'components/atoms/CenterContainer';
import ContributorNav from 'components/organisms/ContributorNav/ContributorNav';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import ContributorCompact from 'components/organisms/Contributor/ContributorCompact';
import Wrapper from '../ScreenWrapper';
import withConnect from './withConnect';
import Empty from './Empty';

const BullesLogo = styled.div`
  width: 90px;
  height: auto;
  margin-top: 30px;
  margin-bottom: 30px;
`;

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

interface Props {
  subscriptions: Contributor[];
  suggestions6: Contributor[];
}

const SubscriptionsScreen = ({ subscriptions, suggestions6 }: Props) => (
  <Wrapper>
    <BullesLogo>
      <Logo />
    </BullesLogo>

    <ContributorNav />

    {subscriptions.length ? (
      <Contributors2col>
        <ContributorsWidth>
          <ContributorsList>
            {subscriptions.map(contributor => (
              <ContributorLarge
                key={contributor.id}
                contributor={contributor}
              />
            ))}
          </ContributorsList>
        </ContributorsWidth>

        <ContributorsAside>
          <ContributorsAsideTitle>Suggestions</ContributorsAsideTitle>

          {suggestions6.map(contributor => (
            <ContributorCompact
              key={contributor.id}
              contributor={contributor}
            />
          ))}

          <CenterContainer>
            <Button>Voir plus</Button>
          </CenterContainer>
        </ContributorsAside>
      </Contributors2col>
    ) : (
      <Empty />
    )}
  </Wrapper>
);

export default withConnect(SubscriptionsScreen);
