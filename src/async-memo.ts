import { useAsync } from "@raviqqe/react-hooks";
import { type DependencyList } from "react";

// TODO Replace with `use` and `cache` after the future release of React 19.
export const useAsyncMemo = <T>(
  callback: () => Promise<T>,
  dependencies?: DependencyList,
): T | undefined => {
  const { value } = useAsync(callback, dependencies ?? []);

  return value;
};
