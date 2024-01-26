export const readFileAsDataURL = (file: File) => new Promise((resolve, reject) => {
    try {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = () => {
            resolve(fileReader.result)
        }
    } catch (err) {
        reject(err)
    }
})