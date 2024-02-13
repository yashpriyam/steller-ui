import { userCodeModel } from '@models';
import mongoose from 'mongoose';

export const saveUserCode = async (
  parent: undefined,
  args: { input: SaveUserCodeInput },
  { contextData }: ContextType
) => {
  try {
    const userData = contextData.user;
    const { questionId, weekNumber, dayNumber, code } = args.input;
    await userCodeModel.findOneAndUpdate(
      {
        userId: new mongoose.Types.ObjectId(userData._id),
        questionId,
        weekNumber,
        dayNumber,
      },
      { code },
      { upsert: true }
    );
    const udpateUserCodeData = await userCodeModel.find({ userId: new mongoose.Types.ObjectId(userData._id) });

    return {
      data: udpateUserCodeData,
      response: { status: 200, message: 'user code saved successfully' },
    };
  } catch (error) {
    console.log('Error saving user code:', error);
    throw new Error('Failed to save user code. Please try again.');
  }
};
