export default () =>
  new Date()
    .getTime()
    .toString(16)
    .concat('', (Math.floor(Math.random() * 16) * 10000).toString(16));
