export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  export const isValidPhoneNumber = (phoneNumber) =>
  /^(\+\d{1,3}[- ]?)?\d{10}$/.test(phoneNumber);
