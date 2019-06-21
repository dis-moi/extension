import * as R from 'ramda';

const WORDS_SEPARATOR = ' ';

const toWords = R.pipe(
  R.trim,
  R.split(WORDS_SEPARATOR)
);
const fromWords = R.join(WORDS_SEPARATOR);

export const truncateButPreserveWords = (
  text = '',
  limit = 50,
  after = '…'
) => {
  if (text.length < limit) {
    return text;
  }

  const words = toWords(text);

  while (fromWords(words).length >= limit) {
    words.pop();
  }

  return `${fromWords(words)}${after}`;
};

export const simpleTruncate = (text = '', limit = 50, after = '…') => {
  if (text.length < limit) {
    return text;
  }

  return `${text.trim().substring(0, limit)}${after}`;
};

export default (text = '', limit = 50, preserveWords = true, after = '…') =>
  preserveWords
    ? truncateButPreserveWords(text, limit - after.length, after)
    : simpleTruncate(text, limit - after.length, after);

const isLongerThan = <T>(nbElements: number) =>
  R.compose<T[], number, boolean>(
    R.lt(nbElements),
    R.length
  );

export const truncateWords = R.curry((nbWords: number, sentence: string) =>
  R.pipe(
    toWords,
    R.when(
      isLongerThan(nbWords),
      R.pipe(
        R.take(nbWords),
        R.append('...')
      )
    ),
    fromWords
  )(sentence)
);
