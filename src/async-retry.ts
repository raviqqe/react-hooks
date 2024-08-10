import { type DependencyList } from "react";
import { useToggle } from "./toggle.js";
import { type AsyncState, useAsync } from "./async.js";

export const useAsyncRetry = <T>(
  callback: () => Promise<T>,
  dependencies?: DependencyList,
): AsyncState<T> & { retry: () => void } => {
  const [on, retry] = useToggle(false);

  const state = useAsync(callback, [on, ...(dependencies ?? [])]);

  return { retry, ...state };
};
