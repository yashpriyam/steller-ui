import { Program } from "@models";
import { UserInputError } from "apollo-server-express";
import { errorMessages, messages } from "@constants";

export const getPaymentDetails = async (
  _parent: undefined,
  args: { programType: ProgramTypeEnum }
): Promise<PaymentDetailsData | UserInputError | unknown> => {
  try {
    const { programType } = args;
    const program: ProgramData | null = await Program.findOne({
      programType,
      isActive: true,
    })?.lean();
    if (program) {
      return {
        name: messages.WEBMASTER,
        description: messages.REGISTRATION_FEE_FOR_WEB_MASTER,
        ...program,
      };
    } else {
      throw new UserInputError(errorMessages.PROGRAMS.NOT_FOUND);
    }
  } catch (error) {
    return error;
  }
};
