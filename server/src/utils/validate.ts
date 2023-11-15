export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPhoneNumber = (phoneNumber: string) =>
  /^\d{10}$/.test(phoneNumber);
