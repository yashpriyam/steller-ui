const isValidPassword = (value: string): boolean => {
  return value.length === 8 || value.length === 0;
};
