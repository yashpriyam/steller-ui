import { batchModel, feePlanModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";

export const createBatch = async (
  parent: undefined,
  args: { input: BatchSchemaType }
): Promise<BatchDataOutputType> => {
  const { BATCH_CREATION_FAILED } = errorMessages.BATCH_MODEL;
  const errorData: CustomResponseType = {
    message: BATCH_CREATION_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const {
      BATCH_CREATION_SUCCESS,
      WEEK_DOES_NOT_EXIST_TO_INSERT_BATCH,
      BATCH_EXIST,
    } = localMessages.BATCH_MODEL;
    const { input } = args;

  
    
    const { batchCode, paymentType, demoStudents: demoStudentIds,paidStudents: paidStudentIds,registeredStudents: registeredStudentIds, startDate } = input;
    
    // Validate required input fields
    if (!batchCode || !startDate) return { response: errorData };

    // Check if the batch with the same code already exists
    const existingBatchData = await batchModel.findOne({ batchCode });
    if (existingBatchData)
      return {
        response: {
          message: BATCH_EXIST,
          status: statusCodes.BAD_REQUEST,
        },
      };

    // Check if the payment type exists
    const existingPaymentType = await feePlanModel.findOne({ name: paymentType });
    if (!existingPaymentType)
      return {
        response: {
          message: "Invalid payment type",
          status: statusCodes.BAD_REQUEST,
        },
      };

    // Create the batch in the database
    const newBatchData = await batchModel.create({
      batchCode,
      paymentType,
      demoStudents: demoStudentIds,
      paidStudents: paidStudentIds,
      registeredStudents: registeredStudentIds,
      startDate,
    });

    return {
      batchData: newBatchData,
      response: newBatchData
        ? {
            message: BATCH_CREATION_SUCCESS,
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
