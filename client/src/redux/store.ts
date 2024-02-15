import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user/userSlice";
import questionSlice from "./slices/question/questionSlice";
import questionAttemptSlice from "./slices/questionAttempt/questionAttemptSlice";
import videosSlice from "./slices/videos/videosSlice";
import notesSlice from "./slices/notes/notesSlice";
import {loginReducer} from "./slices/login/loginSlice";
import weekSlice from "./slices/week/weekSlice";
import userPaymentsSlice from "./slices/userPayments/userPaymentsSlice";
import citySlice from "./slices/city/citySlice";
import feePlanSlice from "./slices/feePlans/feePlanSlice";
import meetingReducer from "./slices/meeting/meetingSlice";
import userCodeSlice from "./slices/userCode/userCodeSlice";
import allUsersPaymentsSlice from "./slices/allusersPayments/allUsersPaymentsSlice";
import batchSlice from "./slices/batch/batchSlice";
import createQuestionSlice from "./slices/createQuestion/createQuestionSlice"
export default configureStore({
  reducer: {
    user: userSlice,
    question: questionSlice,
    questionAttempt: questionAttemptSlice,
    videos: videosSlice,
    notes: notesSlice,
    login :loginReducer,
    week: weekSlice,
    userPayments: userPaymentsSlice,
    city: citySlice,
    feePlans: feePlanSlice,
    meeting: meetingReducer,
    userCode: userCodeSlice,
    allUsersPayments: allUsersPaymentsSlice,
    batch: batchSlice,
    createQuestion:createQuestionSlice
  },
});
