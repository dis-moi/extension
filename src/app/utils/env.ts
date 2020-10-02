export const asArray = <Type>(
  environmentVariableValue: string | undefined
): Array<Type> => {
  if (typeof environmentVariableValue !== 'undefined') {
    const parsed = JSON.parse(environmentVariableValue);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  }

  return [];
};
