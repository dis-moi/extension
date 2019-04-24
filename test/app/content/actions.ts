import chai from 'chai';

import {
  noticesFound,
  dismissNotice,
  likeNotice
} from '../../../src/app/actions/recommendations';
import { init } from '../../../src/app/actions/tabs';
import { EnhancedNotice } from '../../../src/app/lmem/notice';

const expect = chai.expect;

const notice1: EnhancedNotice = {
  id: 1,
  title: 'This is a title',
  description: 'This is a notice',
  resource: {
    author: 'Jalil',
    label: 'Jalil\'s feed',
    url: 'http://jalil',
    editor: { id: 1, label: 'editor', url: 'http://editor' }
  },
  contributor: { organization: 'LMEM', name: 'Jalil', image: '' },
  visibility: 'public',
  valid: true,
  alternatives: [],
  criteria: [],
  dislikes: 0,
  filters: [],
  likes: 0,
  disliked: false,
  dismissed: false,
  liked: false
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

  it('dismiss reco', () => {
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
