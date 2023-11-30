import { useEffect, useRef } from "react";

const useOnOutsideClick = (
  elementRef: React.RefObject<HTMLElement>,
  callback: (e: MouseEvent) => void
): void => {
  const callbackRef = useRef<((e: MouseEvent) => void) | null>(null);
  callbackRef.current = callback;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        elementRef.current &&
        !elementRef.current.contains(e.target as Node) &&
        callbackRef.current
      ) {
        document.body.style.overflowY = "auto";
        callbackRef.current(e);
      }
    };

    document.body.style.overflowY = "hidden";
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.body.style.overflowY = "auto";
      document.removeEventListener("click", handleClickOutside);
    };
  }, [callbackRef, elementRef]);
};

export default useOnOutsideClick;
