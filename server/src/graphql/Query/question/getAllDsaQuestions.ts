import { localMessages, errorMessages, statusCodes } from "@constants";
import { User, questionAttempt, questionModel } from "@models";
import {
  isLoggedIn,
  getUnauthorizedResponse,
  checkPaidUser,
  QuestionTypeObject,
  isAdmin,
} from "@utils";
import mongoose from "mongoose";
export const getAllDsaQuestions = async (
  _parent: undefined,
  args: { filterData: filterDataType },
  { contextData }: ContextType
) => {
  // Messages for responses
  const { QUESTION_FOUND_SUCCESS } = localMessages.QUESTION_MODEL;
  const { QUESTION_NOT_FOUND } = errorMessages.QUESTION_MODEL;
  const { WEEK_NOT_FOUND } = errorMessages.WEEK_MODEL;
  if (!isLoggedIn(contextData)) {
    return getUnauthorizedResponse();
  }

  const errorData: CustomResponseType = {
    message: QUESTION_NOT_FOUND,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    // Fetch user ID
    const userId = contextData.user._id;
    let { filterData } = args;
    const userInfo = await User.findById(userId); //Fetch user info
    const userSelectedFeePlan = userInfo?.feePlan;

    // Check if user is paid
    const isPaidUser = await checkPaidUser(
      userId ?? "",
      userSelectedFeePlan ?? ""
    );
    const email = userInfo?.email;

    // Check if user is admin
    const isAdminUser = await isAdmin(email ?? "");

    // Fetch access weeks for paid users
    const { accessWeeks } = isPaidUser || {};

    // Check if user is not admin and week is specified but not accessible
    if (
      !isAdminUser &&
      filterData.week &&
      !accessWeeks?.includes(filterData?.week)
    ) {
      return {
        response: {
          message: WEEK_NOT_FOUND,
          status: statusCodes.OK,
        },
      };
    }
    // Check if user is not admin and week is specified but not accessible, remove week from filterData
    if (!isAdminUser && !accessWeeks?.includes(filterData?.week)) {
      const { week, ...filteredFilterData } = filterData;
      filterData = filteredFilterData;
    }

    const filteredData: Record<string, string | number | boolean> = filterData;
    const updatedFields: Record<string, string | number | boolean | object> =
      {};

    // Add filtering for 'questionType.dsa'
    updatedFields["questionType"] = QuestionTypeObject.dsa;

    // Copy other filter fields to 'meta' object
    for (const key in filteredData) {
      if (filterData.hasOwnProperty(key)) {
        updatedFields[`meta.${key}`] = filteredData[key];
      }
    }

    // Perform aggregation to get total count and question list
    const [totalCount, questionList] = await Promise.all([
      questionModel.countDocuments(updatedFields),
      questionModel.find(updatedFields).lean(),
    ]);

    // Mapping question IDs from the question list to retrieve attempt data.
    const questionIdList = questionList.map((question) => question._id);

    // Fetch question attempts for the user
    const questionAttemptList: QuestionAttemptSchemaType[] =
      await questionAttempt.find({
        userId: new mongoose.Types.ObjectId(userId),
        questionId: { $in: questionIdList },
      });

    const questionAttemptIdMap: DsaQuestionAttemptIdMapType = {};

    // Mapping each question attempt's DSA response to its corresponding question ID in a map.
    questionAttemptList.map((questionAttemptData) => {
      const { dsaResponse } = questionAttemptData;
      questionAttemptIdMap[questionAttemptData.questionId.toString()] = {
        dsaResponse,
      };
    });

    //Update question list with attempt response information
    const updatedQuestionList = questionList.map((questionData) => {
      const {
        answer,
        options,
        marks,
        _id: questionId,
        ...questionDataRest
      } = questionData;
      const updatedQuestionData = {
        ...questionDataRest,
        questionId,
        attemptResponse: questionAttemptIdMap[questionData._id.toString()],
      };
      return updatedQuestionData;
    });

    // Response based on whether questions are found
    const response: CustomResponseType = updatedQuestionList.length
      ? {
          message: QUESTION_FOUND_SUCCESS,
          status: statusCodes.OK,
        }
      : errorData;

    return {
      questionData: updatedQuestionList,
      totalQuestions: totalCount,
      response,
    };
  } catch (err) {
    return { response: errorData };
  }
};
