import { statusCodes, errorMessages, localMessages } from "@constants";
import { variableModel } from "@models";
import { getUnauthorizedResponse, isLoggedIn } from "@utils";
export const getVariableValue = async (
  _parent: undefined,
  args: { key: string },
  { contextData }: ContextType
): Promise<getVariableOutputType> => {
  const { VARIABLE_FOUND } = localMessages.VARIABLE;
  const { VARIABLE_NOT_FOUND } = errorMessages.VARIABLE;
  const errorData: CustomResponseType = {
    message: VARIABLE_NOT_FOUND,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    if (!isLoggedIn(contextData)) {
      const { message, status } = getUnauthorizedResponse();
      return {
        response: {
          message,
          status,
        },
      };
    }
    const { key } = args;
    const variableData = await variableModel.findOne({ key: key });
    const response: CustomResponseType = variableData?.value?.length
      ? { message: VARIABLE_FOUND, status: statusCodes.OK }
      : errorData;
    const value = variableData?.value;
    return {
      value,
      response,
    };
  } catch (error) {
    return {
      response: errorData,
    };
  }
};
