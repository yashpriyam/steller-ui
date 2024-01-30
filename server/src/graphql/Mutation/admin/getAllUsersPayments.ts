import { errorMessages, localMessages, statusCodes } from "@constants";
import { userPaymentModel } from "@models";
import { getUnauthorizedResponse, isLoggedIn } from "@utils";

export const getAllUserPayments = async (
    parent: undefined,
    args: { input: { isApproved?: boolean, isRejected?: boolean, isPending?: boolean } },
    { contextData }: ContextType
  ): Promise<UserPaymentsDataOutputType> => {
    const { USER_PAYMENT_FETCH_FAILED } = errorMessages.USER_PAYMENT_MODEL;
    const errorData: CustomResponseType = {
      message: USER_PAYMENT_FETCH_FAILED,
      status: statusCodes.BAD_REQUEST,
    };
  
    try {
      const { isApproved, isRejected, isPending } = args.input;
  
      if (!isLoggedIn(contextData)) {
        return {
          response: getUnauthorizedResponse(),
        };
      }
  
      // Construct a query object based on the provided filters
      const query: Record<string, boolean | undefined> = {};
      if (isApproved !== undefined) query.isApproved = isApproved;
      if (isRejected !== undefined) query.isRejected = isRejected;
      // if (isPending !== undefined) query.isPending = isPending; // for now we are not covering this
  
      // Fetch user payments based on the constructed query
      const userPayments = await userPaymentModel.find(query).populate('user batch feePlan');
  
      return {
        userPaymentData: userPayments,
        response: {
          message: localMessages.USER_PAYMENT_MODEL.USER_PAYMENTS_FETCHED_SUCCESSFULLY,
          status: statusCodes.OK,
        },
      };
    } catch (err) {
      console.error(err);
      return {
        response: errorData,
      };
    }
  };
  