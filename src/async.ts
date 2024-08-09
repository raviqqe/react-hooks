import { DependencyList, useEffect, useState } from "react";

export type AsyncState<T> =
  | { loading: false; value: T | undefined }
  | { loading: false; error: unknown }
  | { loading: true };

export const useAsync = <T>(
  callback: () => Promise<T>,
  dependencies: DependencyList,
): AsyncState<T> => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState<T | undefined>();
  const [error, setError] = useState<unknown | undefined>();

  useEffect(() => {
    if (loading) {
      return;
    }

    setLoading(true);

    void callback()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false));
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
