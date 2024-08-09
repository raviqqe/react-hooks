import { renderHook, waitFor } from "@testing-library/react";
import { expect, it } from "vitest";
import { useAsync } from "./async.js";

it("runs without any error", () => {
  renderHook(() => useAsync(async () => null, []));
});

it("runs a callback", async () => {
  let index = 0;

  const { result } = renderHook(() => useAsync(async () => index++, []));

  await waitFor(() =>
    expect(result.current).toEqual({ loading: false, value: 0 }),
  );
});