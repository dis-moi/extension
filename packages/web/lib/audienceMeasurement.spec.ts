import { expect } from 'chai';
import { createAudienceMeasurement } from './audienceMeasurement';

describe('web > lib > audienceMeasurement', function () {
  const setup = () => {
    const started: { domain: string }[] = [];
    const start = createAudienceMeasurement((options) => started.push(options));
    return { started, start };
  };

  it('starts measuring on the configured site', () => {
    const { started, start } = setup();

    start({ domain: 'dismoi.io', doNotTrack: false });

    expect(started).to.deep.equal([{ domain: 'dismoi.io' }]);
  });

  it('measures nothing where no site is configured', () => {
    const { started, start } = setup();

    start({ domain: undefined, doNotTrack: false });
    start({ domain: '', doNotTrack: false });

    expect(started).to.deep.equal([]);
  });

  it('measures nothing for a visitor who asked not to be tracked', () => {
    const { started, start } = setup();

    start({ domain: 'dismoi.io', doNotTrack: true });

    expect(started).to.deep.equal([]);
  });

  it('starts only once, the tracker refusing a second start', () => {
    const { started, start } = setup();

    start({ domain: 'dismoi.io', doNotTrack: false });
    start({ domain: 'dismoi.io', doNotTrack: false });

    expect(started).to.have.lengthOf(1);
  });
});
