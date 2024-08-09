import { DependencyList, useEffect, useState } from "react";

export type AsyncState<T> =
  | { loading: false; value: T | undefined }
  | { loading: false; error: Error }
  | { loading: true };

export const useAsync = <T>(
  callback: () => Promise<void>,
  dependencies: DependencyList,
): AsyncState<T> => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState<T | undefined>();
  const [error, setError] = useState<T | undefined>();

  useEffect(() => {
    void callback().then((value) => {});
  }, dependencies);

  return loading
    ? { loading: true }
    : error
      ? {
          error,
          loading: false,
        }
      : {
          loading: false,
          value,
        };
};
