import {
  type DependencyList,
  startTransition,
  useEffect,
  useRef,
  useState,
} from "react";

export type AsyncState<T> =
  | { loading: false; value: T | undefined }
  | { loading: false; error: unknown }
  | { loading: true };

export const useAsync = <T>(
  callback: () => Promise<T>,
  dependencies?: DependencyList,
): AsyncState<T> => {
  const id = useRef(0);
  const [state, setState] = useState<AsyncState<T>>({ loading: true });

  useEffect(() => {
    const previousId = ++id.current;

    startTransition(() => {
      if (previousId === id.current) {
        setState({ loading: true });
      }
    });

    void callback()
      .then((value) => {
        if (previousId === id.current) {
          setState({ loading: false, value });
        }
      })
      .catch((error) => {
        if (previousId === id.current) {
          setState({ error, loading: false });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return state;
};
