export const deleteCookie = (cookieKey: string) => {
    localStorage.removeItem(cookieKey)
    document.cookie = `${cookieKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}