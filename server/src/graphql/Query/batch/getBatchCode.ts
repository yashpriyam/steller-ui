import { errorMessages, localMessages, statusCodes } from "@constants";
import { batchModel } from "@models";

export const getBatchCode = async (): Promise<AllBatchDataOutputType> => {
  const { BATCH_DOES_NOT_EXIST } = errorMessages.BATCH_MODEL;
  const errorData: CustomResponseType = {
    message: BATCH_DOES_NOT_EXIST,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { BATCH_FOUND_SUCCESS } = localMessages.BATCH_MODEL;
    const batchCodeData = await batchModel.find(
      {},
      { batchCode: 1, _id: 0, startDate: 1 }
    ).sort({_id: -1}).limit(1);
    return batchCodeData
      ? {
          batchData: batchCodeData,
          response: {
            message: BATCH_FOUND_SUCCESS,
            status: statusCodes.OK,
          },
        }
      : { response: errorData };
  } catch (error) {
    return { response: errorData };
  }
};