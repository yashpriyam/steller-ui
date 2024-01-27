import { errorMessages, localMessages, statusCodes } from "@constants";
import { cityModel } from "@models";

export const getAllCities = async (): Promise<CitiesOutputType> => {
    const { DATA_NOT_FOUND } = errorMessages.CITIES;
    const errorData: CustomResponseType = {
        status: statusCodes.BAD_REQUEST,
        message: DATA_NOT_FOUND,
    }
    try {
        const { DATA_FOUND } = localMessages.CITIES;
        const cityData = await cityModel.findOne({});
        const response = cityData ?
            {
                cityData: cityData?.cities,
                response: {
                    status: statusCodes.OK,
                    message: DATA_FOUND,
                }
            } : { response: errorData }
        return response;
    } catch (err) {
        return {
            response: errorData,
        };
    }
};