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
  margin-bottom: 40px;
  color: ${props => props.theme.activeColor};
`;

const SuggestionsWrapper = styled.div`
  height: calc(100vh - 440px);
  margin-bottom: 150px;
  overflow-y: scroll;
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
  background-color: rgba(250, 250, 250, 0.7);
`;

interface ExamplesScreenProps {
  next: () => void;
}

export default ({ next }: ExamplesScreenProps) => (
  <>
    <Header />
    <Wrapper>
      <Intro>
        <Title2>
          Voici votre réseau d&apos;informateurs sur les pages web que vous
          visitez.
        </Title2>
        <Title>
          Si les bulles de l&apos;un d&apos;entre eux ne vous intéressent pas,
          vous pouvez à tout moment vous désabonner.
        </Title>
      </Intro>
    </Wrapper>

    <SuggestionsWrapper>
      <SubscriptionsScreen noSidebar highlightExampleLink />
    </SuggestionsWrapper>

    <BottomLineBg>
      <OnboardingButton onClick={next}>Fermer</OnboardingButton>
      et reprendre ma navigation normale
    </BottomLineBg>
  </>
);
