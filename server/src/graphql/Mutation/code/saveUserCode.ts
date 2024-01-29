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

    // Find the document with the specified criteria
    const existingCode = await userCodeModel.findOne({
      userId: new mongoose.Types.ObjectId(userData._id),
      questionId,
      weekNumber,
      dayNumber,
    });

    if (existingCode) {
      // If the document exists, update it
      await userCodeModel.findOneAndUpdate(
        {
          userId: new mongoose.Types.ObjectId(userData._id),
          questionId,
          weekNumber,
          dayNumber,
        },
        { code }
      );
    } else {
      // If the document doesn't exist, create a new one
      await userCodeModel.create({
        userId: new mongoose.Types.ObjectId(userData._id),
        questionId,
        weekNumber,
        dayNumber,
        code,
      });
    }

    return {
      questionId,
      weekNumber,
      dayNumber,
      code,
      response: { status: 200, message: 'user code saved successfully' },
    };
  } catch (error) {
    console.log('Error saving user code:', error);
    throw new Error('Failed to save user code. Please try again.');
  }
};
