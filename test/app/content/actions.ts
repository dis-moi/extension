import chai from 'chai';
import {
  noticesFound,
  dismissNotice,
  likeNotice
} from 'libs/store/actions/notices';
import { init } from 'libs/store/actions/tabs';
import { StatefulNotice } from 'libs/domain/notice';
import Tab from 'libs/domain/tab';
import { generateStatefulNotice } from '../../fakers/generateNotice';

const expect = chai.expect;

const notice1: StatefulNotice = generateStatefulNotice();

describe('content actions', function() {
  const tab: Tab = { id: 1, url: 'http://tests.menant-benjamin.fr/' };
  it('init', () => {
    const action = init({ version: '0.1', reason: 'install' }, tab);
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
