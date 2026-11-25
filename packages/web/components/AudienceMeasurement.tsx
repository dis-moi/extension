'use client';

import { useEffect } from 'react';
import { init } from '@plausible-analytics/tracker';
import doNotTrack from 'libs/webext/doNotTrack';
import { createAudienceMeasurement } from '../lib/audienceMeasurement';

const startMeasuring = createAudienceMeasurement(init);

/**
 * Sends page views to Plausible, route changes included. It renders nothing
 * and belongs once in each root layout: the tracker needs the browser, so it
 * only starts in an effect.
 *
 * @see https://plausible.io/docs/npm-package
 */
const AudienceMeasurement = () => {
  useEffect(() => {
    startMeasuring({
      domain: process.env.PLAUSIBLE_SITE_DOMAIN,
      doNotTrack: doNotTrack(),
    });
  }, []);

  return null;
};

export default AudienceMeasurement;
