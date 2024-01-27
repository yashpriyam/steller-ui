export const getFirstLettersOfName = (name : string) : string => {
    const arrayOfStrings = name.split(" ")
    let firstLettersOfStrings = arrayOfStrings[0].charAt(0);
    if(arrayOfStrings.length>1) {
        firstLettersOfStrings = firstLettersOfStrings + arrayOfStrings[arrayOfStrings.length - 1].charAt(0);
    }
    return firstLettersOfStrings.toUpperCase();
}