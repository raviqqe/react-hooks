import {
  type DependencyList,
  startTransition,
  useEffect,
  useRef,
  useState,
} from "react";

export type AsyncState<T> =
  | { error: undefined; loading: false; value: T }
  | { error: unknown; loading: false; value: undefined }
  | { error: undefined; loading: true; value: undefined };

const loadingState: AsyncState<never> = {
  error: undefined,
  loading: true,
  value: undefined,
};

export const useAsync = <T>(
  callback: () => Promise<T>,
  dependencies?: DependencyList,
): AsyncState<T> => {
  const id = useRef(0);
  const [state, setState] = useState<AsyncState<T>>(loadingState);

  useEffect(() => {
    const previousId = ++id.current;

    startTransition(() => {
      if (previousId === id.current) {
        setState(loadingState);
      }
    });

    void callback()
      .then((value) => {
        if (previousId === id.current) {
          setState({ error: undefined, loading: false, value });
        }
      })
      .catch((error) => {
        if (previousId === id.current) {
          setState({ error, loading: false, value: undefined });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return state;
};
