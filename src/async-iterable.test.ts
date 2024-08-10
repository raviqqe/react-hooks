import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { useAsyncIterable } from "./async-iterable.js";
import { sleep } from "@raviqqe/loscore/async";

beforeEach(() => {
  vi.useFakeTimers();
});

it("runs without any error", () => {
  renderHook(() => useAsyncIterable((async function* () {})()));
});

it("iterates an iterable", async () => {
  const iterable = (async function* () {
    yield 42;
  })();
  const { result, rerender } = renderHook(() => useAsyncIterable(iterable));

  await result.current.next?.();

  await waitFor(async () => {
    await sleep(1);
    rerender();
    expect(result.current).toEqual({ done: true, loading: false, value: [42] });
  });
});
