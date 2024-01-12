export const setCookie = ({ key, value }: SetCookieArgsType) => {
  document.cookie = `${key}=${value};${document.cookie}`;
};
