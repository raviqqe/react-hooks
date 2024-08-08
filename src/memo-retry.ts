import { type DependencyList, useMemo } from "react";
import { useToggle } from "react-use";

export const useMemoRetry = <T>(
  callback: () => T,
  dependencies: DependencyList,
): [T, () => void] => {
  const [on, toggle] = useToggle(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(callback, [...dependencies, on]);

  return [value, toggle];
};
