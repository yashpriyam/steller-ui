import jwt from "jsonwebtoken";
import { User } from "@models";
import {
  getRegistrationEmailForAdmin,
  getRegistrationEmailForUser,
  sendEmail,
  isValidEmail,
  isValidPhoneNumber,
  uploadImage,
  imageVariableKeys,
  getVariableValuesByKey
} from "@utils";
import { UserInputError } from "apollo-server-express";
import { errorMessages, localMessages, statusCodes } from "@constants";

export const registerUser = async (
  _parent: undefined,
  args: { data: RegisterInputType },
  { res, req }: ContextType,
): Promise<RegisterOutputType | UserInputError | unknown> => {
  const { USER_EXIST } = errorMessages.USER;
  const { VARIABLE_NOT_FOUND } = errorMessages.VARIABLE;
  const { USER_REGISTERED_SUCCESSFULLY} = localMessages.USER;
  try {
    const { data } = args;

    const {
      name,
      email,
      phoneNumber,
      isJobSeeker,
      occupation,
      sessionPreference,
      expectedSalary,
      collegeName,
      location,
      courseYear,
      branch,
      course,
      batchCode,
      profileImage,
    } = data;
    const lowerCaseEmail = email.toLowerCase();
    if (!isValidEmail(lowerCaseEmail)) {
      throw new UserInputError(errorMessages.USER.INVALID_EMAIL);
    } else if (!isValidPhoneNumber(phoneNumber)) {
      throw new UserInputError(errorMessages.USER.INVALID_PHONE_NUMBER);
    }

    const isUserExist = await User.exists({ email:lowerCaseEmail });
    if (isUserExist) {
      return {
        response: {
          status: statusCodes.BAD_REQUEST,
          message:USER_EXIST
        }
      }
    }
    let cloudinaryImageData = {};
    if (profileImage && typeof profileImage === "string") {
      const baseFolderName = 
          await getVariableValuesByKey(imageVariableKeys.cloudinaryBaseFolder)
      const subFolderName = 
          await getVariableValuesByKey(imageVariableKeys.profileImages)
    if (!subFolderName || !baseFolderName) return {
      response: {
        message: VARIABLE_NOT_FOUND,
        status:statusCodes.BAD_REQUEST,
      },
    }
    const imageFolderName = `${baseFolderName?.value[0]}/${subFolderName?.value[0]}`
    console.log({subFolderName, imageFolderName})
      const {publicId,secureUrl} = await uploadImage(profileImage, imageFolderName);
      cloudinaryImageData = {
        publicId,
        secureUrl,
      }
    }
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    const savedUser = await User.create({
      name: capitalizedName,
      email:lowerCaseEmail,
      phoneNumber,
      isJobSeeker,
      occupation,
      sessionPreference,
      expectedSalary,
      collegeName,
      location,
      courseYear,
      branch,
      course,
      batchCode,
      profileImage: {...cloudinaryImageData},
    });

    const { IST: time } = savedUser;

    const emailDetails: EmailType = {
      name: capitalizedName,
      phoneNumber,
      email:lowerCaseEmail,
      time,
    };
    const userData = {
      email: savedUser.email,
      name: savedUser.name,
      phoneNumber: savedUser.phoneNumber,
      collegeName: savedUser.collegeName,
      expectedSalary: savedUser.expectedSalary,
      isJobSeeker: savedUser.isJobSeeker,
      occupation: savedUser.occupation,
      sessionPreference:savedUser.sessionPreference,
      location: savedUser.location,
      courseYear: savedUser.courseYear,
      course: savedUser.course,
      branch: savedUser.branch,
      batchCode: savedUser.batchCode,
      profileImage: savedUser.profileImage,
    }
    await Promise.allSettled([
      sendEmail({
        ...getRegistrationEmailForUser(emailDetails),
        to: lowerCaseEmail,
      }),
      sendEmail({
        ...getRegistrationEmailForAdmin(emailDetails),
        to: [process.env.SENDER_EMAIL || "", "akadme767@gmail.com"],
      }),
    ]);

    const token = jwt.sign({ user: savedUser }, process.env.JWT_SECRET_VALUE || "");
    res.cookie(process.env.JWT_SECRET_KEY || "", token);
    return {
      userData,
      response: {
        message: USER_REGISTERED_SUCCESSFULLY,
        status:statusCodes.OK,
      },
      credentials: token
    };
  } catch (error) {
    return error;
  }
};
