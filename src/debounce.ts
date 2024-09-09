import { type DependencyList, useCallback, useEffect, useRef } from "react";

export const useDebounce = (
  delay: number,
  callback: () => void,
  dependencies: DependencyList,
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

    clear();
    timer.current = setTimeout(() => {
      callbackRef.current();
      timer.current = null;
    }, delay);

    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};
