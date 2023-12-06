import { useState } from "react";

export const useThrottle: Function = (callBack: Function, interval = 500) => {
  const [lastExecutedTime, setLastExecutedTime] = useState<number>(Date.now());
  return (...args: any) => {
    if (lastExecutedTime + interval <= Date.now()) {
      callBack(...args);
      setLastExecutedTime(Date.now());
    }
  };
};

export default useThrottle;
