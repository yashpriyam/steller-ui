import { variableModel } from "@models";

export const getVariableValuesByKey = async (key: string) => {
    try {
        const variableData = await variableModel.findOne({ key: key });
        return variableData;
    } catch (error){
        console.error(error);
    }
}