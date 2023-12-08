import { getCurrentDate } from "../utils/date/dateUtils";
import { useState } from "react";

export const useThrottle: Function = (callBack: Function, interval = 500) => {
  const [lastExecutedTime, setLastExecutedTime] = useState<number>(getCurrentDate());
  return (...args: any) => {
    if (lastExecutedTime + interval <= getCurrentDate()) {
      callBack(...args);
      setLastExecutedTime(getCurrentDate());
    }
  };
};

export default useThrottle;
