import { identity, once } from "@raviqqe/loscore";
import { sleep } from "@raviqqe/loscore/async";
import { useEffect, useMemo, useState } from "react";
import { useAsync } from "./async.js";

interface AsyncIterableState<T> {
  value: T[] | null;
  done: boolean;
  loading: boolean;
  next: () => Promise<void>;
}

interface AutomaticAsyncIterableState<T> {
  done: boolean;
  value: T[] | null;
  loading: boolean;
  error: unknown;
}

const chunk = <T>(value: T) => [value];

export const useAsyncIterable = <T>(
  iterable?: AsyncIterable<T>,
): AsyncIterableState<T> => usePreprocessedAsyncIterable(iterable, chunk);

export const useFlatAsyncIterable = <T>(
  iterable?: AsyncIterable<T[]>,
): AsyncIterableState<T> => usePreprocessedAsyncIterable(iterable, identity);

const usePreprocessedAsyncIterable = <T, S>(
  iterable: AsyncIterable<S> | undefined,
  preprocess: (value: S) => T[],
): AsyncIterableState<T> => {
  const iterator = useMemo(
    () => iterable?.[Symbol.asyncIterator](),
    [iterable],
  );
  const [state, setState] = useState<{
    iterator: AsyncIterator<S> | undefined;
    value: T[] | null;
  }>({
    iterator,
    value: null,
  });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setState({ iterator, value: null });
    setDone(false);
  }, [iterator]);

  const next = useMemo(
    () =>
      once(async () => {
        if (!iterator) {
          return;
        }

        setLoading(true);

        // This is to yield before the first cached batch as a workaround for a bug in react-infinite-scroll-hook.
        // This probably prevents a loading flag from being set back to false in a synchronous way.
        await sleep(0);
        const result = await iterator.next();

        setState((state) =>
          iterator === state.iterator
            ? {
                iterator,
                value: [
                  ...(state.value ?? []),
                  ...(result.done ? [] : preprocess(result.value)),
                ],
              }
            : state,
        );
        setDone(result.done ?? false);
        setLoading(false);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [preprocess, iterator, state.value],
  );

  return { done, loading, next, value: state.value };
};

export const useAutomaticAsyncIterable = <T>(
  iterable?: AsyncIterable<T>,
): AutomaticAsyncIterableState<T> =>
  useAutomaticAsyncIterableState(useAsyncIterable(iterable));

export const useAutomaticFlatAsyncIterable = <T>(
  iterable?: AsyncIterable<T[]>,
): AutomaticAsyncIterableState<T> =>
  useAutomaticAsyncIterableState(useFlatAsyncIterable(iterable));

const useAutomaticAsyncIterableState = <T>({
  loading,
  done,
  next,
  value,
}: AsyncIterableState<T>): AutomaticAsyncIterableState<T> => {
  const state = useAsync(next, [next]);

  return "error" in state ? state : { done, error, loading, value };
};