import { act, renderHook } from "@testing-library/react";
import { expect, it } from "vitest";
import { useToggle } from "./toggle.js";

it("toggles a flag", () => {
  const { result } = renderHook(() => useToggle(false));

  expect(result.current[0]).toBe(false);

  act(() => {
    result.current[1]();
  });

  expect(result.current[0]).toBe(true);
});

it("initializes with true", () => {
  const { result } = renderHook(() => useToggle(true));

  expect(result.current[0]).toBe(true);

  act(() => {
    result.current[1]();
  });

  expect(result.current[0]).toBe(false);
});
