import { WebClient } from "@slack/web-api";
import { errorMessages } from "./constants/errorMessages";
require("dotenv").config();

const options: any = {};
const web = new WebClient(process.env.SLACK_TOKEN as string, options);
let isChannelJoined = false;

const sendSlackMessage = async (
  message: any,
  channel: string | null = null
): Promise<boolean> => {
  return new Promise<boolean>(async (resolve, reject) => {
    const channelId = channel || (process.env.SLACK_CHANNEL_ID as string);

    if(!isChannelJoined){
        const joinResponse = await web.conversations.join({
            channel: channelId,
        });
        isChannelJoined = joinResponse.ok;
    }

    try {
      await web.chat.postMessage({
        blocks: message,
        text: errorMessages.SLACK.INVALID_CONTENT,
        channel: channelId,
      });
      resolve(true);
    } catch (error) {
      console.log({ error });
      reject(error);
    }
  });
};

export default sendSlackMessage;
