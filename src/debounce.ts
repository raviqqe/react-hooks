import { useRef, type DependencyList, useEffect, useCallback } from "react";

export const useDebounce = (
  callback: () => void,
  delay: number,
  dependencies: DependencyList
): void => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef<() => void>(callback);

  const clear = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  useEffect(() => {
    callbackRef.current = callback;

    setTimeout(() => {
      callbackRef.current();
      timer.current = null;
    }, delay);

    return clear;
  }, dependencies);
};
