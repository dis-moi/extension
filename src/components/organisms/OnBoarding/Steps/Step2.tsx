import styled from 'styled-components';
import { Bulleito, Reload } from 'components/atoms/icons';
import React, { useState } from 'react';
import { StepTypes } from './index';
import Text from '../components/Text';
import Video from '../components/Video';
import Line from '../components/Line';
import OnboardingButton from '../components/Buttons';
import OnboardingTitle from '../components/Title';
import Content from '../components/Content';
import { Title1 } from 'components/atoms/Title1';

const MarginTitle = styled(Title1)`
  margin-left: 200px;
`;

export default ({ next }: StepTypes) => {
  const [displayVid, setDisplayVid] = useState(true);
  const onEnded = () => setDisplayVid(false);
  return (
    <>
      <MarginTitle>Épinglez DisMoi</MarginTitle>
      <Content>
        {displayVid && (
          <Video
            src={'/video/dismoi-onboarding.mp4'}
            autoPlay
            onEnded={onEnded}
          >
            Votre navigateur ne gère pas l&apos;élément <code>video</code>.
          </Video>
        )}
        {!displayVid && (
          <>
            <Line>
              <Bulleito />
              <OnboardingTitle align={'left'}>
                Tu es arrivé à épingler l&apos;extension DisMoi ?
              </OnboardingTitle>
            </Line>
            <Line>
              <div>
                <Text>Non, je n&apos;ai pas compris</Text>
                <OnboardingButton
                  color="inactive"
                  onClick={() => setDisplayVid(true)}
                >
                  <Reload /> Revoir le tuto
                </OnboardingButton>
              </div>
              <div>
                <Text>Oui, j&apos; épinglé DisMoi</Text>
                <OnboardingButton onClick={next}>
                  Dernière étape
                </OnboardingButton>
              </div>
            </Line>
          </>
        )}
      </Content>
    </>
  );
};
