import { expect } from 'chai';
import { readOptions } from './dbRestoreOptions.mjs';

describe('bin > database restore options', () => {
  const env = { DISMOI_DUMP: '/tmp/dump.sql' };

  it('defaults to the sample mode and 20,000 rows', () => {
    expect(readOptions([], env)).to.deep.equal({
      mode: 'sample',
      limit: 20000,
      dump: '/tmp/dump.sql',
    });
  });

  it('reads the space-separated form', () => {
    const options = readOptions(['--mode', 'full', '--limit', '500'], env);

    expect(options.mode).to.equal('full');
    expect(options.limit).to.equal(500);
  });

  it('reads the form attached by an equals sign', () => {
    const options = readOptions(['--mode=schema', '--limit=0'], env);

    expect(options.mode).to.equal('schema');
    expect(options.limit).to.equal(0);
  });

  it('prefers the path of the argument to the one of the environment', () => {
    expect(readOptions(['--dump', '/other.sql'], env).dump).to.equal(
      '/other.sql',
    );
  });

  it('refuses an unknown argument rather than passing it over in silence', () => {
    expect(() => readOptions(['--quick'], env)).to.throw('--quick');
  });

  it('refuses a mode with no value', () => {
    expect(() => readOptions(['--mode'], env)).to.throw('--mode');
  });

  it('refuses a limit that is not an integer', () => {
    expect(() => readOptions(['--limit', 'plenty'], env)).to.throw(
      'Invalid limit',
    );
  });

  it('refuses a missing dump path', () => {
    expect(() => readOptions([], {})).to.throw('DISMOI_DUMP');
  });
});
