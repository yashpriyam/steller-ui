const cron = require("node-cron");
import axios, { AxiosResponse } from "axios";
import sendSlackMessage from "../utils/sendSlackMessage";

const PROD_ENVIRONMENT = "production";

const messageBlocks = (message: string) => [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: message,
    },
  },
];

const logMessage = (status: string, message: string) => {
  console.log("----------------------------------------");
  console.log(`Checking server at ${new Date().toLocaleString()}`);
  console.log(`Server is ${status}.`);
  console.log(`Message: ${message}`);
  console.log("----------------------------------------");
};

// Render web services go to sleep when inactive for more than 15 minutes, so this will ping them every 10 minutes.
// https://community.render.com/t/do-web-services-on-a-free-tier-go-to-sleep-after-some-time-inactive/3303

const pingServer = cron.schedule("*/10 * * * * *", async () => {
  const apiUrl: string = process.env.SERVER_URL ?? "";
  const query: string = '{"query":"query { __typename }"}';

  if (process.env.NODE_ENV === PROD_ENVIRONMENT) {
    try {
      const response: AxiosResponse = await axios.post(apiUrl, query, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      logMessage(
        "running properly",
        `Received status code: ${response.status}`
      );

      await sendSlackMessage(
        messageBlocks(
          `Checking server at ${new Date().toLocaleString()} \n\`${process.env.SERVER_ENVIRONMENT}\` server is running properly.\nReceived status code: \`${response.status}\``
        ),
        process.env.SLACK_CHANNEL_ID
      );
    } catch (error) {
      logMessage("throwing error", `Error Message: ${error}`);

      await sendSlackMessage(
        messageBlocks(`Checking server at ${new Date().toLocaleString()} \n\`${process.env.SERVER_ENVIRONMENT}\` server is throwing error.\n\`${error}\``),
        process.env.SLACK_CHANNEL_ID
      );
    }
  }
});

export default pingServer;
