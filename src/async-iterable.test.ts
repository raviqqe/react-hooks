import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useAutomaticAsyncIterable } from "./async-iterable.js";
import { delay } from "es-toolkit";

describe(useAutomaticAsyncIterable.name, () => {
  it("collects no value", async () => {
    const iterator = (async function* () {})();
    const { result } = renderHook(() => useAutomaticAsyncIterable(iterator));

    await waitFor(async () => expect(result.current.value).toEqual([]));
  });

  it("collects a value", async () => {
    const iterator = (async function* () {
      yield 42;
    })();
    const { result } = renderHook(() => useAutomaticAsyncIterable(iterator));

    await waitFor(async () => expect(result.current.value).toEqual([42]));
  });

  it("collects two values", async () => {
    const iterator = (async function* () {
      yield 1;
      yield 2;
    })();
    const { result } = renderHook(() => useAutomaticAsyncIterable(iterator));

    await waitFor(async () => expect(result.current.value).toEqual([1, 2]));
  });

  it("collects a value twice", async () => {
    const { rerender, result } = renderHook(
      ({ iterator }) => useAutomaticAsyncIterable(iterator),
      {
        initialProps: {
          iterator: (async function* () {
            yield 0;
          })(),
        },
      },
    );
    rerender({
      iterator: (async function* () {
        yield 42;
      })(),
    });

    await waitFor(async () => expect(result.current.value).toEqual([42]));
  });
});
