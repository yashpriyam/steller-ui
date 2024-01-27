export const isNonUndefinedAndNullishValueExists = (object: Object) =>
  Object.values(object).some((value: unknown) => value !== undefined && !value);
