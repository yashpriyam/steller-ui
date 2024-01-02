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
  },
  QUESTION_MODEL: {
    QUESTION_CREATION_FAILED: "unable to add question data",
    QUESTION_UPDATION_FAILED: "unable to update question data",
  },
  OTP_MODEL: {
    OTP_SENT_FAILED: "cannot send otp",
    OTP_EMAIL_INVALID: "email address is not valid",
  },
  EMAIL_VERIFICATION_MODEL: {
    OTP_SENT_FAILED: "Failed to send OTP",
    UNREGISTERED_EMAIL: "email address is not registered",
  },
});
