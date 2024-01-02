export const removeNullAndUndefinedKeys = (obj: object) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([key, value]) => value !== null && value !== undefined
    )
  );
};