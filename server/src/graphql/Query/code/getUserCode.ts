import { userCodeModel } from '@models';

export const getUserCode = async (
  parent: undefined,
  args: { input: GetUserCodeInput }
) => {
  try {
    const { userId, questionId, weekNumber, dayNumber } = args?.input || {};
    const query: any = {};

    if (userId) query.userId = userId;
    if (questionId) query.questionId = questionId;
    if (weekNumber !== undefined) query.weekNumber = weekNumber;
    if (dayNumber !== undefined) query.dayNumber = dayNumber;
    const savedCode = await userCodeModel.find(query);
    return {
      data: savedCode,
      response: { status: 200, message: 'User code(s) retrieved successfully' },
    };
  } catch (error) {
    console.log('Error retrieving user code:', error);
    throw new Error('Failed to retrieve user code. Please try again.');
  }
};
