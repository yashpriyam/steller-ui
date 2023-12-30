export const getRandomNumOfDigits = (digits = 1) => {
    const min = 10 ** (digits - 1);
    const max = 10 ** digits - 1;
    return Math.floor(min + Math.random() * (max - min + 1));
}