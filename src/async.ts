import {
  type DependencyList,
  startTransition,
  useEffect,
  useRef,
  useState,
} from "react";

export interface AsyncState<T> {
  error?: unknown;
  loading: boolean;
  value?: T;
}

const loadingState: AsyncState<never> = { loading: true };

export const useAsync = <T>(
  callback: () => Promise<T>,
  dependencies: DependencyList,
): AsyncState<T> => {
  const id = useRef(0);
  const [state, setState] = useState<AsyncState<T>>(loadingState);

  useEffect(() => {
    const previousId = ++id.current;
    const update = (state: AsyncState<T>): void =>
      startTransition(() => {
        if (previousId === id.current) {
          setState(state);
        }
      });

    update(loadingState);

    void callback()
      .then((value) => update({ loading: false, value }))
      .catch((error) => update({ error, loading: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return state;
};
