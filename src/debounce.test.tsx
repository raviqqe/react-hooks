import { act, renderHook, waitFor } from "@testing-library/react";
import { vi, beforeEach, afterEach, expect, it } from "vitest";
import { useDebounce } from "./debounce.js";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
});

it("runs without any error", () => {
  renderHook(() => useDebounce(() => {}, 1, []));
});

it("runs a callback", async () => {
  let index = 0;

  act(() => {
    renderHook(() => useDebounce(() => index++, 1, []));
  });

  await waitFor(() => expect(index).toBe(1));
});

it("runs a callback twice", async () => {
  let value = 0;
  let index = 0;

  const { rerender } = renderHook(() => useDebounce(() => index++, 1, [value]));

  value++;
  rerender();

  await waitFor(() => expect(index).toBe(1));

  value++;
  rerender();

  await waitFor(() => expect(index).toBe(2));
});

it("debounces two calls into one", async () => {
  let value = 0;
  let index = 0;

  const { rerender } = renderHook(() => useDebounce(() => index++, 1, [value]));

  value++;
  rerender();
  value++;
  rerender();

  await waitFor(() => expect(index).toBe(1));

  value++;
  rerender();

  await waitFor(() => expect(index).toBe(2));
});

it("debounces three calls into one", async () => {
  let value = 0;
  let index = 0;

  const { rerender } = renderHook(() => useDebounce(() => index++, 1, [value]));

  value++;
  rerender();
  value++;
  rerender();
  value++;
  rerender();

  await waitFor(() => expect(index).toBe(1));

  value++;
  rerender();

  await waitFor(() => expect(index).toBe(2));
});
