import React from 'react';
import styled from 'styled-components';
import { useTranslation, Trans } from 'react-i18next';
import { Bullito, Reload } from 'src/components/atoms/icons';
import { Title1 } from 'src/components/atoms/Title1';
import Content from '../components/Content';
import Text from '../components/Text';
import Line from '../components/Line';
import OnboardingButton from '../components/Buttons';
import OnboardingTitle from '../components/Title';
import { StepProps } from './index';

const MarginTitle = styled(Title1)`
  margin-left: 130px;
`;

const OnboardingText = styled(Text)`
  color: ${props => props.theme.primaryColor};

  &:first-of-type {
    margin-top: 60px;
  }
`;

export default ({ prev, close }: StepProps) => {
  const { t } = useTranslation('profiles');
  return (
    <Content>
      <MarginTitle>{t('view.onBoarding.step3.title')}</MarginTitle>

      <Line>
        <Bullito />
        <OnboardingTitle align={'left'}>
          {t('view.onBoarding.step3.sub_title')}
        </OnboardingTitle>
      </Line>
      <Trans t={t} i18nKey={'view.onBoarding.step3.paragraph'}>
        <OnboardingText align={'left'}>
          - Lors de l&apos;installation, nous vous avons présélectionné
          plusieurs éclaireurs, plutôt consensuels. À vous de compléter et faire
          les choix définitifs !
        </OnboardingText>
        <OnboardingText align={'left'}>
          - Une fois que vous avez terminé, vous pouvez revenir à votre
          navigation normale sur le web. Les conseils et infos de vos éclaireurs
          apparaitront directement sur les pages web que vous visitez.
        </OnboardingText>
      </Trans>
      <Line>
        <div>
          <OnboardingButton color="inactive" onClick={prev}>
            <Reload />
            {t('view.onBoarding.step3.back_button')}
          </OnboardingButton>
        </div>
        <div>
          <OnboardingButton onClick={close}>
            {t('action.finish')}
          </OnboardingButton>
        </div>
      </Line>
    </Content>
  );
};
