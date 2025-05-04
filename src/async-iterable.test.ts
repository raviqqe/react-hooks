import { renderHook, waitFor } from "@testing-library/react";
import { expect, it } from "vitest";
import { useAsyncIterable } from "./async-iterable.js";

it("runs without any error", async () => {
  const { result } = renderHook(() => useAsyncIterable((async function*() {
    yield 42;
  })()));

  await waitFor(() => expect(result.current.value).toEqual([42]));
});
