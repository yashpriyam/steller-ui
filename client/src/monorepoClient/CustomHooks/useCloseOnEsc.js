import { useEffect, useRef } from "react";

const useCloseOnEsc = (callback) => {
  const callbackRef = useRef();
  callbackRef.current = callback;

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        callbackRef.current(e);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
};

export default useCloseOnEsc;
