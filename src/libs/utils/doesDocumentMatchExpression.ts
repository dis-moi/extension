import { MatchingContext } from '../domain/matchingContext';

const doesDocumentMatchExpression = (
  expression: string,
  matchingContextId: MatchingContext['id']
) => {
  try {
    const { booleanValue } = document.evaluate(
      expression,
      document,
      null,
      XPathResult.BOOLEAN_TYPE,
      null
    );

    return booleanValue;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(
      `[DisMoi] Could not evaluate XPath "${expression}" of matching ${matchingContextId}`
    );

    return false;
  }
};

export default doesDocumentMatchExpression;
