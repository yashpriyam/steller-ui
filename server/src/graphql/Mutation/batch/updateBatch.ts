import { batchModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";

export const updateBatch = async (
  parent: undefined,
  args: { batchCode: string; input: BatchSchemaType }
): Promise<BatchDataOutputType> => {
  const { BATCH_UPDATE_FAILED, BATCH_DOES_NOT_EXIST } = errorMessages.BATCH_MODEL;
  const errorData: CustomResponseType = {
    message: BATCH_UPDATE_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { BATCH_UPDATE_SUCCESS } = localMessages.BATCH_MODEL;
    const { batchCode, input } = args;
      
    // Validate required input fields
    if (!batchCode) return { response: errorData };

    // Check if the batch with the given code exists
    const existingBatchData = await batchModel.findOne({ batchCode });
  
    if (existingBatchData) {
      // Batch exists, perform the update

      const updatedBatchData = await batchModel.findOneAndUpdate(
        { batchCode },
        {
          $set: input,
        },
        { new: true }
      ).populate('paymentType')
      .exec();

      return {
        batchData: updatedBatchData ?? undefined,
        response: {
          message: BATCH_UPDATE_SUCCESS,
          status: statusCodes.OK,
        },
      };
    } else {
      // Batch does not exist, return an error
      return {
        response: {
          message: BATCH_DOES_NOT_EXIST,
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
