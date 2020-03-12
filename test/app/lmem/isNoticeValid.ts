import chai from 'chai';
import { isNoticeValid } from '../../../src/app/lmem/notice';

const expect = chai.expect;

describe('isNoticeValid', function() {
  it('Object with missing contributor is not valid', () => {
    const notice = {
      message: 'Que vous ayez un usage basique, avancé, professionnel [...]'
    };

    expect(isNoticeValid(notice)).to.be.false;
  });

  it('Object with missing message is not valid', () => {
    const notice = {
      contributor: {
        id: 1,
        name: 'Maarten Samson'
      }
    };

    expect(isNoticeValid(notice)).to.be.false;
  });

  it('Object with all props is valid', () => {
    const notice = {
      message: 'Que vous ayez un usage basique, avancé, professionnel [...]',
      contributor: {
        id: 1,
        name: 'Maarten Samson'
      }
    };

    expect(isNoticeValid(notice)).to.be.true;
  });

  it('Object with all props but optional is valid', () => {
    const notice = {
      message: 'Que vous ayez un usage basique, avancé, professionnel [...]',
      contributor: {
        id: 1,
        name: 'Maarten Samson'
      }
    };

    expect(isNoticeValid(notice)).to.be.true;
  });
});
