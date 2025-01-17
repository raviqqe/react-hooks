import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { useDebounce } from "./debounce.js";

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.restoreAllMocks();
});

it("runs without any error", () => {
  renderHook(() => useDebounce(1, () => {}, []));
});

it("runs a callback", async () => {
  let index = 0;

  renderHook(() => useDebounce(1, () => index++, []));

  await waitFor(() => expect(index).toBe(1));
});

it("runs a callback twice", async () => {
  let value = 0;
  let index = 0;

  const { rerender } = renderHook(() => useDebounce(1, () => index++, [value]));

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

  const { rerender } = renderHook(() => useDebounce(1, () => index++, [value]));

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

  const { rerender } = renderHook(() => useDebounce(1, () => index++, [value]));

  value++;
  rerender();
  value++;
  rerender();

  await waitFor(() => expect(index).toBe(1));

  value++;
  rerender();

  await waitFor(() => expect(index).toBe(2));
});
