import { vi } from "vitest";

(global as unknown as { jest: unknown }).jest = {
  advanceTimersByTime: (time: number) => vi.advanceTimersByTime(time),
};
