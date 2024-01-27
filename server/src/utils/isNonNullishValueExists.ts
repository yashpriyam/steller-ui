export const isNonNullishValueExists = (object: Object) =>
  !Object.values(object).some((value: unknown) => !!value);
