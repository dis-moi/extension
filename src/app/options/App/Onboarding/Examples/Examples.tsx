import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
  display: flex;
  justify-content: center;
  width: 100%;
  height: 150px;
  padding-top: 60px;
  font-size: 16px;
  background-color: rgba(250, 250, 250, 0.8);
`;

const OnboardingButtonWrapper = styled.div`
  & + & {
    margin-left: 30px;
  }
`;

const Button = styled(OnboardingButton)`
  text-transform: none;
  font-size: 20px;
  margin: 0 auto;
`;

const SecondaryButton = styled(Button)`
  background-color: ${props => props.theme.button};
  border-color: ${props => props.theme.button};

  &:hover {
    background-color: ${props => props.theme.backgroundButton.hover};
    border-color: ${props => props.theme.backgroundButton.hover};
  }
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
          Pour simplifier votre choix, nous vous avons concocté une sélection de
          contributeurs.
        </Subtitle>
      </Intro>
    </Wrapper>

    <SuggestionsWrapper>
      <SubscriptionsScreen noSidebar highlightExampleLink />
    </SuggestionsWrapper>

    <BottomLineBg>
      <OnboardingButtonWrapper>
        <Button onClick={next}>Valider la sélection</Button>
        et reprendre ma navigation normale
      </OnboardingButtonWrapper>

      <OnboardingButtonWrapper>
        <SecondaryButton as={Link} to="/settings/subscriptions">
          Voir tous les contributeurs
        </SecondaryButton>
      </OnboardingButtonWrapper>
    </BottomLineBg>
  </>
);
