interface UpdateFields {
  [key: string]: any;
}
export function generateNestedUpdate(
  fields: UpdateFields,
  prefix: string = ""
): UpdateFields {
  const updatedFields: UpdateFields = {};

  for (const key in fields) {
    if (Object.prototype.hasOwnProperty.call(fields, key)) {
      const fullPath = prefix ? `${prefix}.${key}` : key;

      if (typeof fields[key] === "object" && !Array.isArray(fields[key])) {
        const nestedUpdates = generateNestedUpdate(fields[key], fullPath);
        Object.assign(updatedFields, nestedUpdates);
      } else {
        updatedFields[fullPath] = fields[key];
      }
    }
  }

  return updatedFields;
}
