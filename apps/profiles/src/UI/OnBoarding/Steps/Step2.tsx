import styled from 'styled-components';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bullito, Reload } from 'src/components/atoms/icons';
import { Title1 } from 'src/components/atoms/Title1';
import Text from '../components/Text';
import Video from '../components/Video';
import Line from '../components/Line';
import OnboardingButton from '../components/Buttons';
import OnboardingTitle from '../components/Title';
import Content from '../components/Content';
import { StepProps } from './index';

const MarginTitle = styled(Title1)`
  margin-left: 200px;
`;

export default ({ next }: StepProps) => {
  const [displayVid, setDisplayVid] = useState(true);
  const { t } = useTranslation('profiles');
  const onEnded = () => setDisplayVid(false);
  return (
    <>
      <MarginTitle>{t('view.onBoarding.step2.title')}</MarginTitle>
      <Content>
        {displayVid && (
          <Video
            src={'/video/dismoi-onboarding.mp4'}
            autoPlay
            muted
            onEnded={onEnded}
          >
            {t('error.common.browser_old')} <code>video</code>.
          </Video>
        )}
        {!displayVid && (
          <>
            <Line>
              <Bullito />
              <OnboardingTitle align={'left'}>
                {t('view.onBoarding.step2.question')}
              </OnboardingTitle>
            </Line>
            <Line>
              <div>
                <Text>{t('view.onBoarding.step2.answer1')}</Text>
                <OnboardingButton
                  color="inactive"
                  onClick={() => setDisplayVid(true)}
                >
                  <Reload /> {t('view.onBoarding.step2.button1')}
                </OnboardingButton>
              </div>
              <div>
                <Text>{t('view.onBoarding.step2.answer2')}</Text>
                <OnboardingButton onClick={next}>
                  {t('view.onBoarding.step2.button2')}
                </OnboardingButton>
              </div>
            </Line>
          </>
        )}
      </Content>
    </>
  );
};
