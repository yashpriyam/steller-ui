export const deleteCookieByKey = (cookieKey: string) => {
    document.cookie = `${cookieKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}