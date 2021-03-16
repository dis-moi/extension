import React from 'react';
import BulleDisMoi from './components/BulleDisMoi';
import Landing from './components/Landing';
import Video from './components/Video';
import Top from './components/Top';
import Loader, { ProgressBar } from './components/Loader';
import Evolution from './components/Evolution';
import { Title1 } from '../../atoms/Title1';
import LogoDisMoiWithD from '../../atoms/icons/LogoDisMoiWithD';

const OnBoarding = () => {
  return (
    <Landing>
      <Evolution>
        <Top>
          <LogoDisMoiWithD />
          <div>
            <BulleDisMoi />
            <Loader>
              <ProgressBar />
              <ProgressBar />
              <ProgressBar />
            </Loader>
          </div>
        </Top>

        <Title1>
          <span>
            L&apos;installation a réussi !
            <br />
            Chargement de votre expérience…
            <br />
            Éplinglez DisMoi
          </span>
        </Title1>
        <Video src="http://v2v.cc/~j/theora_testsuite/320x240.ogg" controls>
          Votre navigateur ne gère pas l&apos;élément <code>video</code>.
        </Video>
      </Evolution>
    </Landing>
  );
};

export default OnBoarding;
