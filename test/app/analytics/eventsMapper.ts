import chai from 'chai';

import mapEventsFromAction from '../../../src/app/analytics/eventsMapper';

const expect = chai.expect;

const fakeAction = Object.freeze({
  type: 'FAKE_ACTION_TYPE'
});

function makeFakeAction(obj: {
  [key: string]: any;
}): { type: string; [key: string]: any } {
  return Object.assign({}, fakeAction, obj);
}

describe('Analytics eventsMapper', () => {
  it('removes type property', () => {
    const mappedEvent = mapEventsFromAction(makeFakeAction({ foo: 'bar' }));

    expect(mappedEvent).to.not.have.any.keys('type');
  });

  it('flattens action object', () => {
    const action = makeFakeAction({
      foo: 'first level',
      bar: { bbaarr: 'second level' },
      too: { ttoo: { tttooo: 'third level' } }
    });
    const mappedEvent = mapEventsFromAction(action);

    expect(mappedEvent).to.not.have.any.keys('bar', 'too');
    expect(mappedEvent).to.have.keys('too.ttoo', 'bar.bbaarr', 'foo');
    expect(mappedEvent.foo).to.equal('first level');
    expect(mappedEvent['bar.bbaarr']).to.equal('second level');
    expect(mappedEvent['too.ttoo']).to.include({ tttooo: 'third level' });
  });

  it('copies action object', () => {
    let mutableObj = makeFakeAction({ foobar: 'original' });
    let mappedEvent = mapEventsFromAction(mutableObj);

    mutableObj.foobar = 'changed';

    expect(mappedEvent).to.include({ foobar: 'original' });
    expect(mutableObj).to.include({ foobar: 'changed' });
    expect(mutableObj).to.include(fakeAction);
  });
});
