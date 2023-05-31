import { it } from "vitest";
import { useDebounce } from "./debounce.js";
import { render } from "@testing-library/react";

const Component = ({ value }: { value: number }) => {
  useDebounce(() => {}, 1, [value]);

  return null;
};

it("runs without any error", () => {
  render(<Component value={1} />);
});
