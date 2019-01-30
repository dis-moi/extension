export default (ternaryValue, trueOrFalse = false) => {
  if (ternaryValue === trueOrFalse || ternaryValue === undefined) {
    return !trueOrFalse;
  }

  return undefined;
};