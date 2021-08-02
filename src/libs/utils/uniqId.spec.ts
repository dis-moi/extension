import { expect } from 'chai';
import uniqId from './uniqId';

describe('uniqId', () => {
  const uniqIds: string[] = [];
  for (let i = 0; i++; i < 10000) {
    uniqIds.push(uniqId());
  }

  it('always return 16 chars', () => {
    uniqIds.forEach(id => expect(id.length).to.equal(16));
  });

  it('generate sufficiently uniq ids', () => {
    const trulyUniqIds = uniqIds.filter(
      (id: string, i: number, a: string[]) => a.indexOf(id) === i
    );

    expect(uniqIds.length).to.equals(trulyUniqIds.length);
  });
});
