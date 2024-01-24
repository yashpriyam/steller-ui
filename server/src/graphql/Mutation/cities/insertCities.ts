import { cityModel } from "@models";
import { statusCodes } from "@constants";

export const insertCities = async (
    parent: undefined,
    args: { citiesData: {cities : string[]} }
): Promise<CitiesOutputType> => {
    const errorData: CustomResponseType = {
        message: "Failed",
        status: statusCodes.BAD_REQUEST,
    };
    try {
        const { citiesData } = args;
        const cityData = await cityModel.create({
            cities:citiesData
        });
        return cityData ? {
            cityData: cityData.cities,
            response: {message: "inserted", status: statusCodes.OK},
        } : {
            response : errorData,
        }
    } catch (err) {
        return {
            response: errorData,
        };
    }
};