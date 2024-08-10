import { type DependencyList } from "react";
import { type AsyncState, useAsync } from "./async.js";
import { useToggle } from "./toggle.js";

export interface AsyncRetryState<T> extends AsyncState<T> {
  retry: () => void;
}

export const useAsyncRetry = <T>(
  callback: () => Promise<T>,
  dependencies?: DependencyList,
): AsyncRetryState<T> => {
  const [on, retry] = useToggle(false);
  const state = useAsync(callback, [on, ...(dependencies ?? [])]);

  return { retry, ...state };
};
