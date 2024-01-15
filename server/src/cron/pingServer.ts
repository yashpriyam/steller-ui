const cron = require("node-cron");
import axios, { AxiosResponse, AxiosError } from "axios";
import { currentTimeInLocaleString } from "../utils/timeUtils";

const PROD_ENVIRONMENT = "production";



// Render web services go to sleep when inactive for more than 15 minutes, so this will ping them every 10 minutes.
// https://community.render.com/t/do-web-services-on-a-free-tier-go-to-sleep-after-some-time-inactive/3303

const pingServer = cron.schedule("*/10 * * * *", () => {
  const apiUrl: string = process.env.SERVER_URL ?? "";
  const query: string = '{"query":"query { __typename }"}';

  if (process.env.NODE_ENV === PROD_ENVIRONMENT) {
    axios
      .post(apiUrl, query, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response: AxiosResponse) => {
        console.log("----------------------------------------");
        console.log(`Checking server at ${currentTimeInLocaleString}`);
        console.log("Server is running properly.");
        console.log(`Received status code: ${response.status}`);
        console.log("----------------------------------------");
      })
      .catch((error: AxiosError) => {
        console.log("----------------------------------------");
        console.log(`Checking server at ${currentTimeInLocaleString}`);
        console.log("Server is throwing error.");
        console.log(`Error Message: ${error.message}`);
        console.log("----------------------------------------");
      });
  }
});

export default pingServer;
