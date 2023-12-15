export const removeNullKeys = (obj: any) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => value !== null)
  );
};
