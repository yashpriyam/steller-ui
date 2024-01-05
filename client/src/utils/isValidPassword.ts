export const isValidPassword = (password: string): boolean => {
  const regex = /^.{8,}$/;
  return regex.test(password);
};