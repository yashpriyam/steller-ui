import { variableModel } from "@models";

export const getSubFolderNameByKey = async (key: string) : Promise<string | void> => {
    const baseFolderName = process.env.CLOUDINARY_BASE_FOLDER;
    try {
        const subFolderVariableData = await variableModel.findOne({ key });
        const folderName = `${baseFolderName}/${subFolderVariableData?.value[0]}`;
        return folderName;
    } catch (error){
        console.error(error);
    }
}