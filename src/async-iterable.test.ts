import { renderHook, waitFor } from "@testing-library/react";
import { expect, it } from "vitest";
import { useAutomaticAsyncIterable } from "./async-iterable.js";

it("runs without any error", async () => {
  const iterator = (async function* () {
    yield 42;
  })();
  const { result } = renderHook(() => useAutomaticAsyncIterable(iterator));

  await waitFor(async () => expect(result.current.value).toEqual([42]));
});
