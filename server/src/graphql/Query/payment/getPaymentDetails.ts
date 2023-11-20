import { Program } from "@models";
import { UserInputError } from "apollo-server-express";
import { errorMessages, localMessages } from "@constants";

export const getPaymentDetails = async (
  _parent: undefined,
  args: { programType: string } 
): Promise<PaymentDetailsDataType | UserInputError | unknown> => {
  try {
    const { programType } = args;
    const program: ProgramDataType | null = await Program.findOne({
      programType,
      isActive: true,
    })?.lean();
    if (program) {
      return {
        name: localMessages.WEBMASTER,
        description: localMessages.REGISTRATION_FEE_FOR_WEB_MASTER,
        ...program,
      };
    } else {
      throw new UserInputError(errorMessages.PROGRAMS.NOT_FOUND);
    }
  } catch (error) {
    return error;
  }
};
