import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation, Trans } from 'react-i18next';
import { Reload } from 'components/atoms/icons';
import { Title1 } from 'components/atoms/Title1';
import isChrome from 'libs/utils/isChrome';
import Content from '../components/Content';
import Text from '../components/Text';
import Line from '../components/Line';
import OnboardingButton from '../components/Buttons';
import { StepProps } from './index';

const MarginTitle = styled(Title1)`
  margin-top: 0;
  margin-bottom: 60px;
  margin-left: 140px;
`;

const OnboardingText = styled(Text)`
  display: inline;
  color: ${props => props.theme.primaryColor};
  font-weight: normal;

  &:first-of-type {
    margin-top: 60px;
  }

  &:last-of-type {
    margin-left: 8px;
    font-weight: bold;
  }
`;
const contentAnim = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const ContentWithEffect = styled(Content)`
  animation: ${contentAnim} 500ms linear forwards;
`;

export default ({ prev, close }: StepProps) => {
  const { t } = useTranslation('profiles');
  return (
    <ContentWithEffect>
      <MarginTitle>{t('view.onBoarding.step3.title')}</MarginTitle>

      <Trans t={t} i18nKey={'view.onBoarding.step3.paragraph'}>
        <OnboardingText align={'center'}>
          Nous vous avons présélectionné plusieurs contributeurs.
        </OnboardingText>
        <OnboardingText align={'center'}>
          À vous de compléter et faire les choix définitifs !
        </OnboardingText>
      </Trans>
      <Line>
        {isChrome && (
          <div>
            <OnboardingButton color="inactive" onClick={prev}>
              <Reload />
              {t('view.onBoarding.step3.back_button')}
            </OnboardingButton>
          </div>
        )}
        <div>
          <OnboardingButton onClick={close}>
            {t('view.onBoarding.step3.end_button')}
          </OnboardingButton>
        </div>
      </Line>
    </ContentWithEffect>
  );
};
