import { feePlanModel } from "@models";
import { errorMessages, statusCodes, localMessages } from "@constants";

export const getFeePlanDetailsByBatchCode = async (
  parent: undefined,
  args: { batchCode: string }
): Promise<FeePlanDataOutputType> => {
  const { FEE_PLAN_FETCH_FAILED } = errorMessages.FEE_PLAN_MODEL;
  const { FEE_PLAN_FETCHED_SUCCESSFULLY } = localMessages.FEE_PLAN_MODEL;
  const errorData: CustomResponseType = {
    message: FEE_PLAN_FETCH_FAILED,
    status: statusCodes.NOT_FOUND,
  };

  try {
    const { batchCode } = args;
    if (!batchCode) return { response: errorData };

    // Fetch fee plan details by batchCode
    const feePlanDetails = await feePlanModel
      .findOne({ batchCode })
      .exec();

    return {
      feePlanData: feePlanDetails ?? undefined,
      response: {
        message: FEE_PLAN_FETCHED_SUCCESSFULLY,
        status: statusCodes.OK,
      },
    };
  } catch (err) {
    console.error(err);
    return { response: errorData };
  }
};
