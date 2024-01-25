import { cityModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";

export const insertCities = async (
    parent: undefined,
    args: { citiesData: {cities : string[]} }
): Promise<CitiesOutputType> => {
    const { INSERTION_FAILED } = errorMessages.CITIES;
    const errorData: CustomResponseType = {
        message: INSERTION_FAILED,
        status: statusCodes.BAD_REQUEST,
    };
    try {
        const {INSERTION_SUCCESS} = localMessages.CITIES;
        const { citiesData } = args;
        const cityData = await cityModel.create({
            cities:citiesData
        });
        return cityData ? {
            cityData: cityData.cities,
            response: { 
                message: INSERTION_SUCCESS,
                status: statusCodes.OK
            },
        } : {
            response : errorData,
        }
    } catch (err) {
        return {
            response: errorData,
        };
    }
};