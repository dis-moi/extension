import React, { useCallback, useState } from 'react';
import LogoDisMoiWithD from 'components/atoms/icons/LogoDisMoiWithD';
import isChrome from 'libs/utils/isChrome';
import BulleDisMoi from './components/BulleDisMoi';
import Landing from './components/Landing';
import Top from './components/Top';
import Loader, { ProgressBar } from './components/Loader';
import Evolution from './components/Evolution';
import Modal from './components/Modal';
import { Step1, Step2, Step3 } from './Steps';

export type CloseFunction = () => void;

const REDIRECTED_PATH = 'pk_campaign=installed';

const OnBoarding = () => {
  const isRedirect = useCallback(
    () => window.location.search.includes(REDIRECTED_PATH),
    [window.location.search]
  );
  if (!isRedirect()) return null;

  const [currentStep, setStep] = useState(0);
  const [open, setOpen] = useState(true);

  const close = () => setOpen(false);
  const next = () => setStep(currentStep + 1);
  const prev = () => setStep(currentStep - 1);
  if (!open) return null;

  const steps = [
    <Step1 key={0} next={next} />,
    <Step2 key={1} prev={prev} next={next} />,
    <Step3 key={2} prev={prev} close={close} />
  ];
  if (!isChrome) steps.splice(1, 1);

  return (
    <Modal open={open} close={close}>
      <Landing>
        <Evolution>
          <Top>
            <LogoDisMoiWithD />
            <div>
              <BulleDisMoi step={currentStep} />
              <Loader>
                {steps.map((step, i) => (
                  <ProgressBar key={i} step={currentStep} />
                ))}
              </Loader>
            </div>
          </Top>
          {steps.map((step, i) => i === currentStep && step)}
        </Evolution>
      </Landing>
    </Modal>
  );
};

export default React.memo(OnBoarding);
