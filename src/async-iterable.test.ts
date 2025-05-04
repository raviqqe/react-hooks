import { renderHook, waitFor } from "@testing-library/react";
import { expect, it } from "vitest";
import { useAutomaticAsyncIterable } from "./async-iterable.js";

it("runs without any error", async () => {
  const { result } = renderHook(() =>
    useAutomaticAsyncIterable(
      (async function* () {
        yield 42;
      })(),
    ),
  );

  await waitFor(async () => expect(result.current.value).toEqual([42]));
});
