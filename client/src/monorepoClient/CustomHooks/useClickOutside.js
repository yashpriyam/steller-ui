import { useEffect, useRef } from "react";
const useClickOutside = (elementRef, callback) => {
  const callbackRef = useRef();
  callbackRef.current = callback;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!elementRef?.current?.contains(e.target) && callbackRef.current) {
        callbackRef.current(e);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [callbackRef, elementRef]);
};

export default useClickOutside;
