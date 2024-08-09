import { renderHook } from "@testing-library/react";
import { it } from "vitest";
import { useAsync } from "./async.js";

it("runs without any error", () => {
  renderHook(() => useAsync(async () => null, []));
});
