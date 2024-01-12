export const setCookie = ({ key = "", value = "" }) => {
    document.cookie = `${key}=${value};${document.cookie}`;
}

