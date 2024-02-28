import { updateUserWithLeetCodeData } from "../updateUserWithLeetcodeData";
import cron from 'node-cron';

// Define the cron job schedule (runs every 4 hours)
const cronSchedule = '0 */4 * * *';


// Define the cron job task
const cronTask = async () => {
  try {
    await updateUserWithLeetCodeData();
  } catch (error) {
    console.error('Error in updateUserWithLeetCodeData:', error);
    process.exit(1); // Exit the server process with a non-zero exit code
  }
};

// Start the cron job
export const updateDbWithLeetcodeDataCron = ()=>  cron.schedule(cronSchedule, cronTask)