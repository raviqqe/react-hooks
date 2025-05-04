import { delay, identity, once } from "es-toolkit";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAsync } from "./async.js";

interface AsyncIterableState<T> {
  done: boolean;
  loading: boolean;
  next: () => Promise<void>;
  value: T[] | null;
}

interface AutomaticAsyncIterableState<T> {
  done: boolean;
  error: unknown;
  loading: boolean;
  value: T[] | null;
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
  const ref = useRef(iterator);
  ref.current = iterator;

  const [value, setValue] = useState<T[] | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue(null);
    setDone(false);
  }, [iterator]);

  const next = useMemo(
    () =>
      once(async () => {
        if (!iterator || iterator !== ref.current) {
          return;
        }

        setLoading(true);

        // This is to yield before the first cached batch as a workaround for a bug in react-infinite-scroll-hook.
        // This probably prevents a loading flag from being set back to false in a synchronous way.
        await delay(0);
        const result = await iterator.next();

        setValue((value) =>
          result.done ? value : [...(value ?? []), ...preprocess(result.value)],
        );
        setDone(result.done ?? false);
        setLoading(false);
      }),
    [preprocess, iterator, value],
  );

  return { done, loading, next, value };
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
  done,
  loading,
  next,
  value,
}: AsyncIterableState<T>): AutomaticAsyncIterableState<T> => {
  const { error } = useAsync(next, [next]);

  return error
    ? { done: true, error, loading: false, value: null }
    : { done, error: undefined, loading, value };
};
