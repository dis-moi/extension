import chai from 'chai';
import * as R from 'ramda';
import { truncateWords } from 'libs/utils/truncate';

const expect = chai.expect;

describe('truncateWords', function() {
  it('does nothing on empty string', () => {
    expect(truncateWords(8, '')).to.eq('');
  });
  it('does nothing if less words than limit', () => {
    const textWith7Words = 'some text with seven words in english';
    expect(truncateWords(8, textWith7Words)).to.eq(textWith7Words);
  });
  it('does nothing if as many words as limit', () => {
    const textWith8Words = 'some text with exactly eight words in english';
    expect(truncateWords(8, textWith8Words)).to.eq(textWith8Words);
  });
  it('does truncate if more words than limit', () => {
    expect(
      truncateWords(8, 'some text with more than eight words in english')
    ).to.eq('some text with more than eight words in ...');
  });
  it('is currified', () => {
    const textWith8Words = 'some text with exactly eight words in english';
    expect(truncateWords(8, textWith8Words)).to.eq(
      truncateWords(8)(textWith8Words)
    );
  });
  it('is composable', () => {
    const textWithMoreThan8Words =
      'some text with more than eight words in english';
    expect(
      R.pipe<string, string, string, string>(
        truncateWords(8),
        truncateWords(6),
        truncateWords(4)
      )(textWithMoreThan8Words)
    ).to.eq(truncateWords(4)(textWithMoreThan8Words));
  });
});
