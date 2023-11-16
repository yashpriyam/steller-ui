export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPhoneNumber = (phoneNumber: string): boolean =>
  /^\d{10}$/.test(phoneNumber);
