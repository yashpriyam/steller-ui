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
    if (!isLoggedIn(contextData)) {
      const { message, status } = getUnauthorizedResponse();
      return {
        response: {
          message,
          status,
        },
      };
    }
    const { variableData } = args;
    const findVariable = await variableModel.find({ key: variableData.key });

    if (findVariable?.length) {
      return {
        response: {
          status: statusCodes.NOT_FOUND,
          message: VARIABLE_KEY_ALREADY_EXIST,
        },
      };
    }
    const data: VariableSchemaType = await variableModel.create(variableData);
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
