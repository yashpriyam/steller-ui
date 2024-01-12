import { getCurrentTime } from "../utils/index";
import { useState } from "react";

export const useThrottle: Function = (callBack: Function, interval = 500) => {
  const [lastExecutedTime, setLastExecutedTime] = useState<number>(getCurrentTime());
  return (...args: any) => {
    if (lastExecutedTime + interval <= getCurrentTime()) {
      callBack(...args);
      setLastExecutedTime(getCurrentTime());
    }
  };
};

export default useThrottle;
