export const errorMessages = Object.freeze({
  USER: {
    INVALID_EMAIL: "invalid email address",
    INVALID_PHONE_NUMBER: "invalid phone number",
    INVALID_USER_PROFILE_IMAGE: "Failed to get profile image",
    USER_EXIST: "user already registerd",
    USER_PASSWPRD_UPDATION_FAILED: "password updation failed",
    USER_LOGIN_FAILED: "invalid email and password",
    UPLOAD_IMAGE_FAILED: "failed to upload image",
    USER_UPDATE_FAILED: "User update failed.",
    USER_NOT_FOUND: "User not found.",
    USER_FETCH_FAILED: "Failed to fetch user information.",
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
    OTP_SENT_FAILED: "Failed to send OTP",
    OTP_EMAIL_INVALID: "Email address is not valid",
    UNREGISTERED_EMAIL: "Email address is not registered",
    OTP_EMAIL_NOT_EXIST: "email address not exist",
  },
  QUESTION_ATTEMPT_MODEL: {
    QUESTION_ATTEMPT_FAILED: "unable to submit your response",
  },
  IMAGE: {
    NOT_AN_ARRAY: "Please provide image in an array",
    NO_IMAGE_FOUND_WITH_PUBLIC_ID: "Failed to retrieve image with public ID",
    FAILED_TO_DELETE_IMAGE: "Failed to delete image with public ID",
    FAILED_TO_UPLOAD_IMAGE: "Failed to upload image",
    NO_PUBLIC_ID_PROVIDED: "No public ID found",
  },
  PAID_USER_MODEL: {
    PAID_USER_CREATION_FAILED: "unable to insert paid user data",
    PAID_USER_ALREADY_EXIST: "user already exists",
    PAID_USER_UPDATION_FAILED: "unable to update paid user data",
    PAID_USER_LOGIN_FAILED: "invalid email and password",
  },
  WEEK_MODEL: {
    WEEK_CREATION_FAILED: "unable to insert week data",
    WEEK_NOT_FOUND: "week data not found",
  },
  MSG: {
    UNAUTHORIZED_USER: "unauthorized user",
  },
  DAY_MODEL: {
    DAY_MODEL_REQUIRED_FIELDS: "WeekNumber, batchCode, dayNumber and date is required",
    DAY_CREATION_FAILED: "unable to insert day data",
    DAY_UPDATION_FAILED: "unable to update day data",
  },
  RESUME_MODEL: {
    RESUME_UPSERT_FAILED: "unable to insert resume data",
  },
  SLACK: {
    INVALID_CONTENT: "This content can't be displayed",
  },
  BATCH_MODEL: {
    BATCH_CREATION_FAILED: "Batch creation failed.",
    BATCH_UPDATE_FAILED: "Batch update failed.",
    BATCH_DOES_NOT_EXIST: "Batch does not exist.",
    BATCH_EXIST: "Batch with the same code already exists.",
  },
  FEE_PLAN_MODEL: {
    FEE_PLAN_CREATION_FAILED: "Failed to create fee plan.",
    FEE_PLAN_EXIST: "Fee plan with the same batch code already exists.",
    FEE_PLAN_UPDATE_FAILED: "Fee plan update failed.",
    FEE_PLAN_DOES_NOT_EXIST: "Fee plan does not exist.",
    FEE_PLAN_FETCH_FAILED: "Failed to fetch fee plan details.",
  },
  USER_PAYMENT_MODEL: {
    USER_PAYMENT_CREATION_FAILED: "User payment creation failed.",
    USER_PAYMENT_FETCH_FAILED: "Failed to fetch user payments",
    USER_PAYMENT_UPDATE_FAILED: "Failed to update user payments"

  },
  CITIES: {
    DATA_NOT_FOUND: "No data found for cities",
    INSERTION_FAILED: "Unable to insert cities data",
  },
  MEETING_MODEL: {
    MEETING_REQUIRED_FIELDS:
      "Meeting number, password, title and meetingCode is required",
    DUBLICATE_MEETING_FIELDS: "Dublicate meeting number, meeting code or title",
    UNABLE_TO_CREATE_MEETING: "Unable to create meeting",
    UNABLE_TO_FIND_MEETING: "Unable to find meetings",
    MEETING_NUMBER_OR_MEETING_CODE_IS_REQUIRED_TO_UPDATE_MEETING:
      "Meeting number or meeting code is required to update meeting",
    MEETING_NUMBER_MEETING_CODE_OR_TITLE_REQUIRED:
      "meeting number, meeting code or title is required",
    CANNOT_FIND_MEETING_DETAILS:
      "Cannot find meeting details with given filter",
    UNABLE_TO_UPDATE_MEETINGS: "Unable to update meeting details",
  },
});
