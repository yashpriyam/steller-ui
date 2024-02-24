import { statusCodes, errorMessages, localMessages } from "@constants";
import { questionAttempt, questionModel } from "@models";
import { isLeetCodeLink } from "@utils";
export const dsaQuestionAttempt = async (
  _parent: undefined,
  args: { questionData: QuestionAttemptSchemaType },
  { contextData }: ContextType
): Promise<unknown> => {
  const { QUESTION_ATTEMPT_SUCCESS } = localMessages.QUESTION_ATTEMPT_MODEL;
  const { BAD_SUBMISSION_LINK, BAD_TEST_DATA, FAILED_TO_SAVE_RESPONSE } =
    errorMessages.QUESTION_ATTEMPT_MODEL;

  try {
    const userData = contextData.user;
    const userId = userData._id;
    const { questionData } = args;
    const { questionId, dsaResponse } = questionData;
    const { submissionLink, testCases } = dsaResponse as DsaResponseType;
    // Check if the submission link is from LeetCode
    if (!isLeetCodeLink(submissionLink)) {
      return {
        response: {
          message: BAD_SUBMISSION_LINK,
          status: statusCodes.BAD_REQUEST,
        },
      };
    }
    const { passedTestCases, totalTestCases } = testCases as TestCasesType;
    // Ensure passed test cases do not exceed total test cases
    if (passedTestCases > totalTestCases) {
      return {
        response: {
          message: BAD_TEST_DATA,
          status: statusCodes.BAD_REQUEST,
        },
      };
    }
    // Check if the question exists
    const isExistingQuestion = await questionModel.exists({
      _id: questionId,
    });

    // If the question exists, update or create the question attempt record
    if (isExistingQuestion) {
      const dsaAttemptData = await questionAttempt.findOneAndUpdate(
        { userId, questionId },
        {
          dsaResponse,
        },
        { upsert: true, new: true } // Create new record if it doesn't exist
      );
      return {
        dsaResponseData: dsaAttemptData,
        response: {
          message: QUESTION_ATTEMPT_SUCCESS,
          status: statusCodes.CREATED,
        },
      };
    }
    // Otherwise, show an error that the question does not exist
    return {
      response: {
        message: FAILED_TO_SAVE_RESPONSE,
        status: statusCodes.BAD_REQUEST,
      },
    };
  } catch (error) {
    // Handle any errors that occur during the process
    return {
      response: {
        message: FAILED_TO_SAVE_RESPONSE,
        status: statusCodes.BAD_REQUEST,
      },
    };
  }
};
