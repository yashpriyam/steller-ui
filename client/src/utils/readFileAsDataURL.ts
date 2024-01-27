export const readFileAsDataURL = (file: File) : Promise<string| ArrayBuffer> => new Promise((resolve, reject) => {
    try {
        const fileReader = new FileReader();
        fileReader?.readAsDataURL(file);
        fileReader.onloadend = () => {
            resolve(fileReader.result || "")
        }
    } catch (err) {
        reject(err)
    }
})