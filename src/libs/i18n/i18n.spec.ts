import { expect } from 'chai';
import i18n, { options } from './index';

describe('i18n translation', () => {
  beforeEach(() => {
    i18n.init(options).then(() => {});
  });
  const testCreationDate = new Date(2021, 4 /* may */, 10);
  it('common.or return or', () => {
    expect(i18n.t('common.or')).to.equal('or');
  });
  it('return format short version en', () => {
    expect(i18n.t('date.short', { date: testCreationDate })).to.equal(
      '05/10/2021'
    );
  });
  it('return format short version en from profiles NS', () => {
    expect(
      i18n.t('profiles:notice.since', { date: testCreationDate })
    ).to.equal('Since 05/10/2021');
  });
});
