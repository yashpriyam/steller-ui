export const removeNullOrUndefinedKeys=(obj:Record<string,unknown>):object=> {
  const cleanedObject:Record<string,unknown> = {};

  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined) {
      cleanedObject[key] = obj[key];
    }
  }

  return cleanedObject;
}
