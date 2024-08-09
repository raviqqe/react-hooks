import { renderHook, waitFor } from "@testing-library/react";
import { expect, it } from "vitest";
import { useAsync } from "./async.js";

it("runs without any error", () => {
  renderHook(() => useAsync(async () => null, []));
});

it("runs a callback", async () => {
  const { result } = renderHook(() => useAsync(async () => 42, []));

  await waitFor(() =>
    expect(result.current).toEqual({ loading: false, value: 42 }),
  );
});

it("runs a callback twice with the same dependency", async () => {
  let value = 0;

  const { result, rerender } = renderHook(() =>
    useAsync(async () => ++value, [0]),
  );

  await waitFor(() =>
    expect(result.current).toEqual({ loading: false, value: 1 }),
  );

  rerender();

  await waitFor(() =>
    expect(result.current).toEqual({ loading: false, value: 1 }),
  );
});

it("runs a callback twice with different dependency", async () => {
  let dependency = 0;
  let value = 0;

  const { result, rerender } = renderHook(() =>
    useAsync(async () => ++value, [dependency]),
  );

  await waitFor(() =>
    expect(result.current).toEqual({ loading: false, value: 1 }),
  );

  ++dependency;
  rerender();

  await waitFor(() =>
    expect(result.current).toEqual({ loading: false, value: 2 }),
  );
});
