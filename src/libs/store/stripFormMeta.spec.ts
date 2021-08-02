import { expect } from 'chai';
import generateContribution from 'test/fakers/generateContribution';
import { submitContribution } from 'libs/store/actions/contribution';
import stripFormMeta from './stripFormMeta';

describe('stripFormMeta', () => {
  it('remove resolve and reject meta', () => {
    const strippedFormAction = stripFormMeta(
      submitContribution(generateContribution(), {
        form: 'contributionForm',
        resolve: () => {},
        reject: () => {}
      })
    );

    expect(strippedFormAction).to.not.have.nested.property('meta.resolve');
    expect(strippedFormAction).to.not.have.nested.property('meta.reject');
    expect(strippedFormAction).to.have.nested.property('meta.form');
  });
});
