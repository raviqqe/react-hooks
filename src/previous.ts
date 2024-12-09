import { useEffect, useRef } from "react";

export const usePrevious = <T>(state: T): T => {
  const ref = useRef<T>(state);

  useEffect(() => {
    ref.current = state;
  });

  return ref.current;
};
