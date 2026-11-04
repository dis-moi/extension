import { expect } from 'chai';
import { getExtensionTitle } from './tab';

describe('getExtensionTitle', () => {
  const initialEnv = process.env.NODE_ENV;
  afterEach(() => {
    process.env.NODE_ENV = initialEnv;
  });

  it('is just the brand name in production', () => {
    process.env.NODE_ENV = 'production';
    expect(getExtensionTitle()).to.equal('DisMoi');
  });

  it('suffixes the brand name with the environment outside production', () => {
    process.env.NODE_ENV = 'staging';
    expect(getExtensionTitle()).to.equal('DisMoi - staging');
  });
});
