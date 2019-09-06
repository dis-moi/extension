import chai from 'chai';

import {
  noticesFound,
  dismissNotice,
  likeNotice
} from '../../../src/app/actions/notices';
import { init } from '../../../src/app/actions/tabs';
import { StatefulNotice } from '../../../src/app/lmem/notice';
import Tab from 'app/lmem/Tab';

const expect = chai.expect;

const notice1: StatefulNotice = {
  id: 1,
  intention: 'approval',
  message: 'This is a notice',
  source: {
    label: 'Jalil',
    url: 'http://jalil'
  },
  contributor: { id: 1, name: 'Jalil', contributions: 42 },
  visibility: 'public',
  ratings: { dislikes: 0, likes: 0 },
  state: { disliked: false, dismissed: false, liked: false, markedRead: false },
  created: new Date(),
  modified: new Date()
};

describe('content actions', function() {
  const tab: Tab = { id: 1, url: 'http://tests.menant-benjamin.fr/' };
  it('init', () => {
    const action = init({ version: '0.1' }, tab);
    expect(action.payload)
      .to.be.an('object')
      .to.include.all.keys('version');

    expect(action.meta)
      .to.be.an('object')
      .to.include.all.keys('tab');
  });

  it('noticesFound', () => {
    const action = noticesFound([notice1], tab);

    expect(action.type)
      .to.be.a('string')
      .of.length.above(5);
    expect(action.payload.notices).to.deep.equal([notice1]);
  });

  it('dismiss notice', () => {
    const id = 0;
    const action = dismissNotice(id);

    expect(action.type)
      .to.be.a('string')
      .of.length.above(5);
    expect(action.payload.id).to.equal(id);
  });

  it('likes notice', () => {
    const id = 0;
    const action = likeNotice(id);

    expect(action.type)
      .to.be.a('string')
      .of.length.above(5);
    expect(action.payload.id).to.equal(id);
  });
});
