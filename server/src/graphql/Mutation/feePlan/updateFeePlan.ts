import { feePlanModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";

export const updateFeePlan = async (
  parent: undefined,
  args: { feePlanId: string; input: FeePlanSchemaType }
): Promise<FeePlanDataOutputType> => {
  const { FEE_PLAN_UPDATE_FAILED, FEE_PLAN_DOES_NOT_EXIST } = errorMessages.FEE_PLAN_MODEL;
  const errorData: CustomResponseType = {
    message: FEE_PLAN_UPDATE_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { FEE_PLAN_UPDATE_SUCCESS } = localMessages.FEE_PLAN_MODEL;
    const { feePlanId, input } = args;

  
    // Validate required input fields
    if (!feePlanId) return { response: errorData };

    // Check if the feePlan with the given ID exists
    const existingFeePlanData = await feePlanModel.findById(feePlanId);
    

    if (existingFeePlanData) {
      // FeePlan exists, perform the update

      const updatedFeePlanData = await feePlanModel.findByIdAndUpdate(
        feePlanId,
        {
          $set: input,
        },
        { new: true }
      );

      if (!updatedFeePlanData) {
        return { response: errorData };
      }

      return {
        feePlanData: updatedFeePlanData,
        response: {
          message: FEE_PLAN_UPDATE_SUCCESS,
          status: statusCodes.OK,
        },
      };
    } else {
      // FeePlan does not exist, return an error
      return {
        response: {
          message: FEE_PLAN_DOES_NOT_EXIST,
          status: statusCodes.BAD_REQUEST,
        },
      };
    }
  } catch (err) {
    console.error(err);
    return {
      response: errorData,
    };
  }
};
