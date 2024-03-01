import { errorMessages } from "./constants/errorMessages";
import { statusCodes } from "./constants/statusCodes";

export const getUnauthorizedResponse = () => {
  return {
    message: errorMessages.MSG.UNAUTHORIZED_USER,
    status: statusCodes.UNAUTHORIZED,
  };
};