import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { useAsyncIterable } from "./async-iterable.js";

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
  const { result } = renderHook(() => useAsyncIterable(iterable));

  await result.current.next?.();

  await waitFor(() =>
    expect(result.current).toEqual({ done: true, loading: false, value: [42] }),
  );
});
