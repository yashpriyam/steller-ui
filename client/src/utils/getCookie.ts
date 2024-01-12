export const getCookie = (searchedCookie: string): string | null => {
    const cookieList = document.cookie.split(';');

    for (let i = 0; i < cookieList.length; i++) {
        const [cookieName, cookieValue] = cookieList[i].trim().split("=");
        if (cookieName === searchedCookie) {
            return cookieValue;
        }
    }
    return null;
}