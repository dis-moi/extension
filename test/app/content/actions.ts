import chai from 'chai';

import {
  noticesFound,
  dismissNotice,
  likeNotice
} from '../../../src/app/actions/notices';
import { init } from '../../../src/app/actions/tabs';
import { EnhancedNotice } from '../../../src/app/lmem/notice';

const expect = chai.expect;

const notice1: EnhancedNotice = {
  id: 1,
  intention: 'approval',
  message: 'This is a notice',
  source: {
    label: 'Jalil',
    url: 'http://jalil'
  },
  contributor: { id: 1, name: 'Jalil', image: '' },
  visibility: 'public',
  ratings: { dislikes: 0, likes: 0 },
  status: { disliked: false, dismissed: false, liked: false, read: false },
  created: new Date(),
  modified: new Date()
};

describe('content actions', function() {
  it('init', () => {
    const action = init(1, { version: '0.1' });
    expect(action.payload)
      .to.be.an('object')
      .to.include.all.keys('installationDetails', 'tab');
  });

  it('noticesFound', () => {
    const action = noticesFound([notice1], 1);

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
