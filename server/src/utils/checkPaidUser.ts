import {
  feePlanModel,
  userPaymentModel,
  weekModel,
} from '@models';
import mongoose from 'mongoose';

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

    const allUserPayments = await userPaymentModel.find({ user: userId }).sort({ date: -1 });
  
    
    const feePlansInstallment = getFeePlans?.installments;

  const userInstallments = feePlansInstallment?.filter((installment)=> {
   return allUserPayments.some(({installmentId})=> {
       const feePlanInstallmentId= new mongoose.Types.ObjectId(installment._id);
       const userInstallmentId = new mongoose.Types.ObjectId(installmentId);
         return feePlanInstallmentId.equals(userInstallmentId)
    })
  })

  if (Boolean(userInstallments?.length)) {
    return {
      isPaidUser: true,
      accessWeeks: userInstallments?.map((userInstallment)=> {
          return userInstallment.accessWeeks?.map((week)=> week.weekNumber)
      }).flat(1)
    }
  }

  return {
    isPaidUser: false,
    accessWeeks:[1,2]
  }
}
