export const truncateButPreserveWords = (text = '', limit = 50, after = '…') => {
  const words = text.trim().split(' ');

  while (words.join(' ').length > limit) {
    words.pop();
  }

  return `${words.join(' ')}${after}`;
};

export const simpleTruncate = (text = '', limit = 50, after = '…') => `${text.trim().substring(0, limit)}${after}`;

export default (text = '', limit = 50, preserveWords = true, after = '…') => (
  preserveWords
    ? truncateButPreserveWords(text, limit - after.length, after)
    : simpleTruncate(text, limit - after.length, after)
);
