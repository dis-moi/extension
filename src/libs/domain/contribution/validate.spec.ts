/* eslint-disable no-unused-expressions, @typescript-eslint/ban-ts-ignore */
import { expect } from 'chai';
import validateContribution from './validate';

describe('domain/contribution/validate', () => {
  it('rejects undefined contribution', () => {
    // @ts-ignore
    expect(validateContribution()).to.not.be.empty;
  });
  it('rejects empty contribution', () => {
    // @ts-ignore
    expect(validateContribution({})).to.not.be.empty;
  });
  it('rejects contribution missing message', () => {
    expect(
      // @ts-ignore
      validateContribution({
        contributor: { name: 'name', email: 'email@domain.com' }
      })
    ).to.not.be.empty;
  });
  it('rejects contribution missing contributor', () => {
    expect(
      // @ts-ignore
      validateContribution({
        message: 'message'
      })
    ).to.not.be.empty;
  });
  it('rejects contribution missing contributor name', () => {
    expect(
      validateContribution({
        message: 'message',
        // @ts-ignore
        contributor: { email: 'email@domain.com' }
      })
    ).to.not.be.empty;
  });
  it('rejects contribution missing contributor email', () => {
    expect(
      validateContribution({
        message: 'message',
        // @ts-ignore
        contributor: { name: 'name' }
      })
    ).to.not.be.empty;
  });
  it('rejects contribution with invalid contributor email', () => {
    expect(
      // @ts-ignore
      validateContribution({
        message: 'message',
        contributor: { name: 'name', email: 'email' }
      })
    ).to.not.be.empty;
  });
  it('sums up all the error messages', () => {
    // @ts-ignore
    const errors = validateContribution({
      contributor: { name: 'name', email: 'email' }
    });

    expect(errors).to.have.property('message', 'Ce champs est obligatoire.');
    expect(errors).to.have.nested.property(
      'contributor.email',
      "L'email n'est pas valide."
    );
  });
  it('returns empty object for valid contribution', () => {
    expect(
      // @ts-ignore
      validateContribution({
        message: 'message',
        contributor: { name: 'name', email: 'email@domain.com' }
      })
    ).to.be.empty;
  });
});
