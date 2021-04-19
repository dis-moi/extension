import { expect } from 'chai';
import stripFormMeta from './stripFormMeta';
import { submitContribution } from '../actions/contribution';
import generateContribution from 'test/fakers/generateContribution';

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
