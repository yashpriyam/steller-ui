import { statusCodes, localMessages, errorMessages } from "@constants";
import { variableModel } from "@models";
import { getUnauthorizedResponse, isLoggedIn } from "@utils";
import { response } from "express";

export const createVariable = async (
  _parent: undefined,
  args: { variableData: VariableDataType },
  { contextData }: ContextType
): Promise<VariableDataOutputType> => {
  const { VARIABLE_CREATED } = localMessages.VARIABLE;
  const { VARIABLE_KEY_ALREADY_EXIST, VARIABLE_NOT_CREATED } =
    errorMessages.VARIABLE;
  try {
    // Check if user is logged in
    if (!isLoggedIn(contextData)) {
      const { message, status } = getUnauthorizedResponse();
      // Return unauthorized response if user is not logged in
      return {
        response: {
          message,
          status,
        },
      };
    }
    const { variableData } = args;
    // Check if variable with the same key already exists
    const findVariable = await variableModel.find({ key: variableData.key });

    if (findVariable?.length) {
      // Return error if variable with the same key exists
      return {
        response: {
          status: statusCodes.NOT_FOUND,
          message: VARIABLE_KEY_ALREADY_EXIST,
        },
      };
    }
    // Create new variable
    const data: VariableSchemaType = await variableModel.create(variableData);
    // Return success response
    return {
      data,
      response: {
        status: statusCodes.OK,
        message: VARIABLE_CREATED,
      },
    };
  } catch (error) {
    return {
      response: {
        status: statusCodes.BAD_REQUEST,
        message: VARIABLE_NOT_CREATED,
      },
    };
  }
};
