type StartTracker = (options: { domain: string }) => void;

interface Visit {
  /** The site as declared in Plausible; absent where nothing is measured. */
  domain: string | undefined;
  doNotTrack: boolean;
}

/**
 * Decides whether the audience of a visit is measured. The tracker is handed
 * in so that the rule does not depend on a browser.
 *
 * The tracker throws when started twice, which React does on purpose in
 * development: the returned function starts it at most once.
 */
export const createAudienceMeasurement = (startTracker: StartTracker) => {
  let started = false;

  return ({ domain, doNotTrack }: Visit): void => {
    if (started || !domain || doNotTrack) return;
    started = true;
    startTracker({ domain });
  };
};
