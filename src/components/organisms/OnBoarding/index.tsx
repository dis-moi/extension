import React, { useState } from 'react';
import BulleDisMoi from './components/BulleDisMoi';
import Landing from './components/Landing';
import Top from './components/Top';
import Loader, { ProgressBar } from './components/Loader';
import Evolution from './components/Evolution';
import LogoDisMoiWithD from '../../atoms/icons/LogoDisMoiWithD';
import { Step1, Step2 } from './components/Steps';

const OnBoarding = () => {
  const [currentStep, setStep] = useState(0);
  const next = () => setStep(currentStep + 1);
  const prev = () => setStep(currentStep - 1);
  const steps = [
    <Step1 key={0} prev={prev} next={next} />,
    <Step2 key={1} prev={prev} next={next} />
  ];

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
        {steps.map((step, i) => i === currentStep && step)}
      </Evolution>
    </Landing>
  );
};

export default OnBoarding;
