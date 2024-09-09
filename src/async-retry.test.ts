import { renderHook, waitFor } from "@testing-library/react";
import { expect, it } from "vitest";
import { useAsyncRetry } from "./async-retry.js";

it("runs without any error", () => {
  renderHook(() => useAsyncRetry(async () => null, []));
});

it("runs a callback", async () => {
  const { result } = renderHook(() => useAsyncRetry(async () => 42, []));

  await waitFor(() =>
    expect(result.current).toEqual({
      loading: false,
      retry: expect.any(Function) as unknown,
      value: 42,
    }),
  );
});

it("runs a callback twice with the same dependency", async () => {
  let value = 0;

  const { rerender, result } = renderHook(() =>
    useAsyncRetry(async () => ++value, [0]),
  );

  await waitFor(() =>
    expect(result.current).toEqual({
      loading: false,
      retry: expect.any(Function) as unknown,
      value: 1,
    }),
  );

  rerender();

  await waitFor(() =>
    expect(result.current).toEqual({
      loading: false,
      retry: expect.any(Function) as unknown,
      value: 1,
    }),
  );
});

it("runs a callback twice with different dependency", async () => {
  let dependency = 0;
  let value = 0;

  const { rerender, result } = renderHook(() =>
    useAsyncRetry(async () => ++value, [dependency]),
  );

  await waitFor(() =>
    expect(result.current).toEqual({
      loading: false,
      retry: expect.any(Function) as unknown,
      value: 1,
    }),
  );

  ++dependency;
  rerender();

  await waitFor(() =>
    expect(result.current).toEqual({
      loading: false,
      retry: expect.any(Function) as unknown,
      value: 2,
    }),
  );
});

it("retries a computation", async () => {
  let value = 0;

  const { result } = renderHook(() => useAsyncRetry(async () => ++value, [0]));

  result.current.retry();

  await waitFor(() =>
    expect(result.current).toEqual({
      loading: false,
      retry: expect.any(Function) as unknown,
      value: 2,
    }),
  );
});
