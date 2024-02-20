import { variableModel } from "@models";
const cloudinaryCredentialKeys = Object.freeze(
                    ["cloudinaryApiSecret", "cloudinaryCloudName", "cloudinaryApiKey"]);
export const getCloudinaryCredentials = async (): Promise<CloudinaryCrendentialsType | void> => {
    try {
        const variableData = await variableModel.find({ key:{ $in : cloudinaryCredentialKeys} });

        const credentialsValues: CloudinaryCrendentialsType = {};

        variableData.forEach(data => {
            credentialsValues[data.key] = data.value[0];
        });

        return credentialsValues;
    } catch (error){
        console.error(error);
    }
}