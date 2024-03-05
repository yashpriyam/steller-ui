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
        callbackRef.current(e);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [callbackRef, elementRef]);
};

export default useOnOutsideClick;