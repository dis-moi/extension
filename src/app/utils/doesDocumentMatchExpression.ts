const doesDocumentMatchExpression = (expression: string) => {
  const { booleanValue } = document.evaluate(
    expression,
    document,
    null,
    XPathResult.BOOLEAN_TYPE,
    null
  );

  return booleanValue;
};

export default doesDocumentMatchExpression;
