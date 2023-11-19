import { Transaction } from "@models";

export const createTransaction = async (
  _parent: undefined,
  args: { data: CreateTransactionType }
): Promise<CreateTransactionType | unknown> => {
  try {
    const { data } = args;
    const { amount, programType, paymentId, userId, isPaymentSuccessfull } =
      data;
    const transaction: CreateTransactionType = await Transaction.create({
      userId,
      amount,
      paymentId,
      programType,
      isPaymentSuccessfull,
    });
    return transaction;
  } catch (err) {
    return err;
  }
};
