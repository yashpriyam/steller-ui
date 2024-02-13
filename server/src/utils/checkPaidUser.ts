import { feePlanModel, userPaymentModel, weekModel } from '@models';
import mongoose from 'mongoose';

export async function checkPaidUser(
  userId: string,
  userSelectedFeePlan: string
) {
  try {
    console.log(3345, {userId})
    const getFeePlans = await feePlanModel
      .findById(userSelectedFeePlan)
      .populate({
        path: 'installments.accessWeeks',
        model: weekModel,
      });
      console.log(3675, {userId})

    const allUserPayments = await userPaymentModel
      .find({ user: userId })
      .sort({ date: -1 });

    const feePlansInstallment = getFeePlans?.installments;
    console.log(23245, {userId})

    const userInstallments = feePlansInstallment?.filter((installment) => {
      return allUserPayments.some(({ installmentId }) => {
        const feePlanInstallmentId = new mongoose.Types.ObjectId(
          installment._id
        );
        const userInstallmentId = new mongoose.Types.ObjectId(installmentId);
        return feePlanInstallmentId.equals(userInstallmentId);
      });
    });
    console.log(232, { userId });
    if (Boolean(userInstallments?.length)) {
      return {
        isPaidUser: true,
        accessWeeks: userInstallments?.flatMap((userInstallment) => {
          // mapping user fee installments
          return userInstallment.accessWeeks?.map((week) => week.weekNumber); // mapping  weeks of each installment to only keep the week number
        }),
      };
    }

    return {
      isPaidUser: false,
      accessWeeks: [1, 2],
    };
  } catch (error) {
    return {
      isPaidUser: false,
      accessWeeks: [1, 2],
    };
  }
}
