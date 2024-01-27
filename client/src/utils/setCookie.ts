export const setCookie = ({ key, value }: SetCookieArgsType) => {
  localStorage.setItem(key, value)
  document.cookie = `${key}=${value};${document.cookie}`;
};
