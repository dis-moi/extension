export default (input, init) => fetch(`.${input}`, init)
  .then(resp => resp.text());
