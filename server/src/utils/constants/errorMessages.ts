export const errorMessages = Object.freeze({
  USER: {
    INVALID_EMAIL: "invalid email address",
    INVALID_PHONE_NUMBER: "invalid phone number",
  },
  PROGRAMS: {
    NOT_FOUND: "program is not active or not exists",
  },
  NOTES_MODEL: {
    NOTES_CREATION_FAILED: "unable to add notes data",
    NOTES_DELETION_FAILED: "unable to delete notes data",
    NOTES_UPDATION_FAILED: "unable to update notes",
    NOTES_NOT_FOUND: "notes not found",
  },
  VIDEO_MODEL: {
    VIDEO_CREATION_FAILED: "unable to insert video data",
    VIDEO_DELETION_FAILED: "unable to delete video data",
    VIDEO_NOT_FOUND: "video not found",
    VIDEO_UPDATION_FAILED: "unable to update video data",
  },
  USER_ACTIVITY: {
    USER_ACTIVITY_UPDATION_FAILED: "unable to update user activity",
  },
  QUESTION_MODEL: {
    QUESTION_CREATION_FAILED: "unable to add question data",
    QUESTION_UPDATION_FAILED: "unable to update question data",
    QUESTION_NOT_FOUND: "questions not found",
  },
  OTP_MODEL: {
    OTP_SENT_FAILED: "cannot send otp",
    OTP_EMAIL_INVALID: "email address and otp is not valid",
    OTP_EMAIL_NOT_EXIST: "email address not exist",
  },
  PAID_USER_MODEL: {
    PAID_USER_CREATION_FAILED: "unable to insert paid user data",
    PAID_USER_ALREADY_EXIST: "user already exists",
    PAID_USER_UPDATION_FAILED: "unable to update paid user data",
    PAID_USER_LOGIN_FAILED: "invalid email and password",
  },
});
