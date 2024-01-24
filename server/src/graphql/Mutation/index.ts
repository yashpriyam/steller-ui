export { login } from "./auth/login";
export {
  registerUser,
  sendOtpToRegisteredUser,
  verifyUserOtp,
  updateUserPassword,
  updateCoverImage
} from "./user/index";
export { createTransaction } from "./transaction/createTransaction";
export { createNotes, deleteNotesById, updateNotesById } from "./notes/index";
export { createVideo, deleteVideoById, updateVideoById } from "./video/index";
export { upsertUserActivity } from "./userActivity/index";
export { createQuestion, updateQuestionById } from "./question/index";
export { sendOtp } from "./otp/index";
export { createQuestionAttemptByUser } from "./questionAttempts/index";
export { updateProfilePicture } from "./user/updateProfilePicture";
export {
  createPaidUser,
  sendOtpToPaidUser,
  verifyOtpPaidUser,
  updatePaidUserPassword,
} from "./paidUser/index";
export { upsertWeek } from "./week/index";
export { createDay, updateDay } from "./day/index";
export { upsertUserProfile } from "./userProfile/index";
export { createFeePlan, updateFeePlan } from "./feePlan/index";
export { createBatch, updateBatch } from "./batch/index";
export { createUserPayment, getUserPaymentsByUserId } from  "./userPaymentsHistory/index"