import { type DependencyList, startTransition, useMemo } from "react";
import { useToggle } from "./toggle.js";

export const useMemoRetry = <T>(
  callback: () => T,
  dependencies: DependencyList,
): [T, () => void] => {
  const [on, toggle] = useToggle(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(callback, [...dependencies, on]);

  return [value, () => startTransition(toggle)];
};
