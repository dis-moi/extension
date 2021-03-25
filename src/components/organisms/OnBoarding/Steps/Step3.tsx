import React from 'react';
import { Bulleito, Reload } from 'components/atoms/icons';
import { StepTypes } from './index';
import Text from '../components/Text';
import Line from '../components/Line';
import OnboardingButton from '../components/Buttons';
import OnboardingTitle from '../components/Title';
import Content from '../components/Content';
import styled from 'styled-components';
import { Title1 } from 'components/atoms/Title1';

const MarginTitle = styled(Title1)`
  margin-left: 130px;
`;

const OnboardingText = styled(Text)`
  color: ${props => props.theme.primaryColor};

  &:first-of-type {
    margin-top: 60px;
  }
`;

export default ({ prev, close }: StepTypes) => (
  <Content>
    <MarginTitle>Bienvenue chez DisMoi</MarginTitle>

    <Line>
      <Bulleito />
      <OnboardingTitle align={'left'}>Un dernier mot !</OnboardingTitle>
    </Line>

    <OnboardingText align={'left'}>
      Lors de l&apos;installation, nous vous avons présélectionné plusieurs
      éclaireurs, plutôt consensuels. A vous de compléter et faire les choix
      définitifs !
    </OnboardingText>
    <OnboardingText align={'left'}>
      Une fois que vous avez terminé, vous pouvez revenir à votre navigation
      normale sur le web. Les conseils et infos de vos éclaireurs apparaitront
      directement sur les pages web que vous visitez.
    </OnboardingText>

    <Line>
      <div>
        <OnboardingButton color="inactive" onClick={prev}>
          <Reload />
          Revoir le tuto
        </OnboardingButton>
      </div>
      <div>
        <OnboardingButton onClick={close}>Terminer</OnboardingButton>
      </div>
    </Line>
  </Content>
);
