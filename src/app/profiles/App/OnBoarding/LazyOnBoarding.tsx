import React, { Suspense } from 'react';
import { TriggerWelcomeBulle } from './withConnect';

const OnBoarding = React.lazy(() =>
  import(
    /* webpackChunkName: "OnBoarding" */ 'app/profiles/App/OnBoarding/OnBoarding'
  )
);

interface LazyOnBoarding {
  isOnBoarding: boolean;
  triggerWelcomeBulle: TriggerWelcomeBulle;
}

const LazyOnBoarding = ({
  isOnBoarding,
  triggerWelcomeBulle
}: LazyOnBoarding) => {
  if (!isOnBoarding) return null;

  return (
    <Suspense fallback={<>Chargement...</>}>
      <OnBoarding triggerWelcomeBulle={triggerWelcomeBulle} />
    </Suspense>
  );
};

export default LazyOnBoarding;
