import { feePlanModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";

export const createFeePlan = async (
  parent: undefined,
  args: { feePlanData: FeePlanSchemaType }
): Promise<FeePlanDataOutputType> => {
  const { FEE_PLAN_CREATION_FAILED } = errorMessages.FEE_PLAN_MODEL;
  const errorData: CustomResponseType = {
    message: FEE_PLAN_CREATION_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { FEE_PLAN_CREATION_SUCCESS } = localMessages.FEE_PLAN_MODEL;
    const { FEE_PLAN_EXIST } = errorMessages.FEE_PLAN_MODEL;
    const { feePlanData } = args;
    const { batchCode, name, description, installments, miscellaneous } =
      feePlanData;

    // Validate required input fields
    if (!name || !description || !installments) {
      return { response: errorData };
    }

    // Create the fee plan in the database
    const newFeePlanData = await feePlanModel.create({
      batchCode,
      name,
      description,
      installments,
      miscellaneous,
    });

    return {
      feePlanData: newFeePlanData,
      response: newFeePlanData
        ? {
            message: FEE_PLAN_CREATION_SUCCESS,
            status: statusCodes.OK,
          }
        : errorData,
    };
  } catch (err) {
    console.error(err);
    return {
      response: errorData,
    };
  }
};
