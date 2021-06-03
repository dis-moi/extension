import React, { Suspense } from 'react';

const OnBoarding = React.lazy(() =>
  import(
    /* webpackChunkName: "OnBoarding" */ 'app/profiles/App/OnBoarding/OnBoarding'
  )
);

const REDIRECTED_PATH = 'pk_campaign=installed';
export const isOnboarding = () =>
  window.location.search.includes(REDIRECTED_PATH);

const LazyOnBoarding = () => {
  if (!isOnboarding()) return null;

  return (
    <Suspense fallback={<>Chargement...</>}>
      <OnBoarding />
    </Suspense>
  );
};

export default LazyOnBoarding;
