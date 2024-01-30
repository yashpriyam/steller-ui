export const getDateFromIntValue = (date?: Date)=> { 
    const newDate = new Date(parseInt(date?.toString() ?? '', 10));

    // Format the date as a string
    const formattedDate = newDate.toLocaleDateString();
    return formattedDate
}