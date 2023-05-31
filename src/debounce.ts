import { useRef, type DependencyList, useEffect } from "react";

export const useDebounce = (
  callback: () => void,
  delay: number,
  dependencies: DependencyList
): void => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef<() => void>(callback);

  useEffect(() => {
    callbackRef.current = callback;

    setTimeout(() => {
      callbackRef.current();
      timer.current = null;
    }, delay);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [callback, delay, ...dependencies]);
};
