import Video from '../Video';
import React from 'react';
import styled from 'styled-components';
import { Title1 } from '../../../../atoms/Title1';
import { StepTypes } from './index';

const Step1Title = styled(Title1)`
  overflow: hidden;
`;

export default ({ next }: StepTypes) => (
  <>
    <Step1Title>
      <span>
        L&apos;installation a réussi !
        <br />
        Chargement de votre expérience…
        <br />
        Éplinglez DisMoi
      </span>
    </Step1Title>
    <Video
      src="http://v2v.cc/~j/theora_testsuite/320x240.ogg"
      controls
      onEnded={next}
    >
      Votre navigateur ne gère pas l&apos;élément <code>video</code>.
    </Video>
  </>
);
