import { renderHook } from "@testing-library/react";
import { it } from "vitest";
import { useAsyncIterable } from "./async-iterable.js";

it("runs without any error", () => {
  renderHook(() => useAsyncIterable((async function* () {})()));
});
