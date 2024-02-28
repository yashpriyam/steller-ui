import { updateDbWithLeetcodeDataCron } from "./updateDbWithLeetcodeDataCron"
import pingServer from "./pingServer";

export const startCronJobs = ()=> {
    updateDbWithLeetcodeDataCron()
    pingServer.start()
}