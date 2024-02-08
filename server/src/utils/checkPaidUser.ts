import {
  feePlanModel,
  weekModel,
} from '@models';

export async function checkPaidUser(
  userId: string,
  userSelectedFeePlan: string
) {
  const getFeePlans = await feePlanModel
    .findById(userSelectedFeePlan)
    .populate({
      path: 'installments.accessWeeks',
      model: weekModel,
    });
  const feePlansInstallment = getFeePlans?.installments;

  return false;
}
