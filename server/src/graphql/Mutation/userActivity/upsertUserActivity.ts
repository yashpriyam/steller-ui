import { userActivityModel } from "@models";
import { localMessages, errorMessages, statusCodes } from "@constants";
import { isValidPhoneNumber, sendEmail, getUserActivityEmail } from "@utils";

export const upsertUserActivity = async (
    parent: undefined,
    args: { userActivityData: UserActivityInputType },
    context: ContextType
): Promise<UserActivityOutputType | void> => {
    try {
        const { userActivityData } = args;
        const { phoneNumber, isOpened, IST } = userActivityData;
        const { USER_ACTIVITY_UPDATED } = localMessages.USER_ACTIVITY;
        console.log({ userActivityData });

        if (phoneNumber && isValidPhoneNumber(phoneNumber)) {
            const [activityResult, activityListResult] =
                await Promise.allSettled([
                    userActivityModel.findOneAndUpdate(
                        {
                            phoneNumber,
                        },
                        {
                            phoneNumber,
                            isOpened,
                            IST,
                            isValidPhoneNumber: true,
                            $push: {
                                devices: context.req.headers["user-agent"],
                            },
                        },
                        { upsert: true, new: true }
                    ),
                    userActivityModel.find(
                        { isValidPhoneNumber: true },
                        { phoneNumber: 1 }
                    ),
                ]);
            if (activityListResult.status !== "fulfilled" || activityResult.status !== "fulfilled") {
                return;
            }
            const userActivity: UserActivityData = activityResult.value;
            const userActivityList: UserActivityData[] = activityListResult.value;
            if (
                userActivity &&
                userActivity.createdAt.toString() === userActivity.updatedAt.toString()
            ) {
                await sendEmail({
                    ...getUserActivityEmail({
                        phoneNumber,
                        time: userActivity.IST,
                        userActivityList,
                    }),
                    to: process.env.SENDER_EMAIL || "",
                });
            }
        } else {
            await userActivityModel.create({
                isOpened: true,
                phoneNumber,
                IST,
                devices: context.req.headers["user-agent"],
            });
        }
        return {
            response: {
                status: statusCodes.OK,
                message: USER_ACTIVITY_UPDATED,
            },
        };
    } catch (err) {
        const { USER_ACTIVITY_UPDATION_FAILED } = errorMessages.USER_ACTIVITY;
        return {
            response: {
                status: statusCodes.BAD_REQUEST,
                message: USER_ACTIVITY_UPDATION_FAILED,
            },
        };
    }
};
