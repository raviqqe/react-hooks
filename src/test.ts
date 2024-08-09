import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, vi } from "vitest";

beforeAll(() => {
  (global as unknown as { jest: unknown }).jest = vi;
});

afterEach(() => {
  vi.restoreAllMocks();
  cleanup();
});
