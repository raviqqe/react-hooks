import { renderHook, waitFor } from "@testing-library/react";
import { expect, it } from "vitest";
import { useAsync } from "./async.js";
import { sleep } from "@raviqqe/loscore/async";

it("runs without any error", () => {
  renderHook(() => useAsync(async () => null, []));
});

it("runs a callback", async () => {
  let index = 0;

  const { result, rerender } = renderHook(() =>
    useAsync(async () => index++, []),
  );

  await sleep(1);

  await waitFor(() => {
    rerender();
    expect(result.current).toEqual({ loading: false, value: 0 });
  });
});
