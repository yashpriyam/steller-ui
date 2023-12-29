export const setCookie = ({ key = "", value = "" }) => {
    document.cookie = `${key}=${value};${document.cookie}`;
}

export const getCookie = (searchedCookie) => {
    const cookieList = document.cookie.split(';');

    for (let i = 0; i < cookieList.length; i++) {
        const [cookieName, cookieValue] = cookieList[i].trim().split("=");
        if (cookieName === searchedCookie) {
            return cookieValue;
        }
    }
    return null;
}
