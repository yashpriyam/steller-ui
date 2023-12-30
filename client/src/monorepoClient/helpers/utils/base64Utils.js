export const objectToBase64 = (object) => {
    try {
        return btoa(JSON.stringify(object));
    } catch (err) {
        return null;
    }
};
export const base64ToJson = (base64String) => {
    try {
        return JSON.parse(atob(base64String));
    } catch (err) {
        return null;
    }
}