import { act, renderHook } from "@testing-library/react";
import { expect, it } from "vitest";
import { useMemoRetry } from "./memo-retry.js";

it("memoizes a value", () => {
  let index = 0;

  const { rerender, result } = renderHook(() =>
    useMemoRetry(() => index++, []),
  );

  expect(result.current[0]).toBe(0);

  rerender();

  expect(result.current[0]).toBe(0);
});

it("updates a value", () => {
  let value = 0;
  let index = 0;

  const { rerender, result } = renderHook(() =>
    useMemoRetry(() => index++, [value]),
  );

  expect(result.current[0]).toBe(0);

  value++;
  rerender();

  expect(result.current[0]).toBe(1);

  value++;
  rerender();

  expect(result.current[0]).toBe(2);
});

it("retries a value computation", () => {
  let index = 0;

  const { result } = renderHook(() => useMemoRetry(() => index++, []));

  expect(result.current[0]).toBe(0);

  act(() => result.current[1]());

  expect(result.current[0]).toBe(1);
});
