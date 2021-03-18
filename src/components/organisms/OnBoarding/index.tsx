import React, { useState } from 'react';
import BulleDisMoi from './components/BulleDisMoi';
import Landing from './components/Landing';
import Top from './components/Top';
import Loader, { ProgressBar } from './components/Loader';
import Evolution from './components/Evolution';
import LogoDisMoiWithD from '../../atoms/icons/LogoDisMoiWithD';
import { Step1, Step2 } from './components/Steps';
import Modal from './components/Modal';
import Step3 from './components/Steps/Step3';

export type CloseFunction = () => void;

const OnBoarding = () => {
  const [currentStep, setStep] = useState(0);
  const [open, setOpen] = useState(true);

  const close = () => setOpen(false);
  const next = () => setStep(currentStep + 1);
  const prev = () => setStep(currentStep - 1);

  const steps = [
    <Step1 key={0} prev={prev} next={next} />,
    <Step2 key={1} prev={prev} next={next} />,
    <Step3 key={1} prev={prev} close={close} />
  ];

  return (
    <Modal open={open} close={close}>
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
    </Modal>
  );
};

export default OnBoarding;
