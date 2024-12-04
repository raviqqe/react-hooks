import { type DependencyList, startTransition } from "react";
import { type AsyncState, useAsync } from "./async.js";
import { useToggle } from "./toggle.js";

export interface AsyncRetryState<T> extends AsyncState<T> {
  retry: () => void;
}

export const useAsyncRetry = <T>(
  callback: () => Promise<T>,
  dependencies: DependencyList,
): AsyncRetryState<T> => {
  const [on, toggle] = useToggle(false);
  const state = useAsync(callback, [on, ...dependencies]);

  return { retry: () => startTransition(toggle), ...state };
};
