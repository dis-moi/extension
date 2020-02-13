import React from 'react';
import styled from 'styled-components';
import SubscriptionsScreen from '../../Settings/SubscriptionsScreen';
import Intro from '../atoms/OnboardingIntro';
import Title from '../atoms/OnboardingTitle';
import Wrapper from '../atoms/OnboardingWrapper';
import OnboardingButton from '../atoms/OnboardingButton';
import Header from '../../Header';

const Title2 = styled(Title)`
  margin-top: 20px;
  font-weight: 800;
  color: ${props => props.theme.activeColor};
`;

const Subtitle = styled.p`
  margin-top: 0;
  font-size: 16px;
`;

const SuggestionsWrapper = styled.div`
  height: calc(100vh - 220px);
  padding-right: 10px;
  padding-left: 10px;
  overflow-y: scroll;

  ${SubscriptionsScreen} {
    margin-bottom: 150px;
  }

  @media (max-width: 820px) {
    height: auto;
    margin-top: 0;
    overflow-y: inherit;
  }
`;

const BottomLineBg = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  background-color: rgba(250, 250, 250, 0.8);
`;

interface ExamplesScreenProps {
  next: () => void;
}

export default ({ next }: ExamplesScreenProps) => (
  <>
    <Header />
    <Wrapper>
      <Intro>
        <Title2>Votre réseau d’informateurs</Title2>
        <Subtitle>
          Vous êtes abonné(e) à tous les contributeurs pour découvrir et
          bénéficier au mieux du service.
        </Subtitle>
      </Intro>
    </Wrapper>

    <SuggestionsWrapper>
      <SubscriptionsScreen noSidebar highlightExampleLink />
    </SuggestionsWrapper>

    <BottomLineBg>
      <OnboardingButton onClick={next}>
        Fermer la page abonnement
      </OnboardingButton>
      et reprendre ma navigation normale… avec Bulles !
    </BottomLineBg>
  </>
);
