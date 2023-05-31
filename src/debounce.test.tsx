import { expect, it } from "vitest";
import { useDebounce } from "./debounce.js";
import { act, render, waitFor } from "@testing-library/react";

interface Props {
  value: number;
  onChange: () => void;
}

const Component = ({ value, onChange }: Props) => {
  useDebounce(onChange, 1, [value]);

  return null;
};

it("runs without any error", () => {
  render(<Component value={1} onChange={() => {}} />);
});

it("runs a callback", () => {
  let index = 0;

  act(() => {
    render(
      <Component
        value={1}
        onChange={() => {
          index++;
        }}
      />
    );
  });

  waitFor(() => expect(index).toBe(1));
});

it("runs a callback twice", () => {
  let index = 0;

  const renderComponent = (value: number) =>
    render(
      <Component
        value={value}
        onChange={() => {
          index++;
        }}
      />
    );

  act(() => renderComponent(1));

  waitFor(() => expect(index).toBe(1));

  act(() => renderComponent(2));

  waitFor(() => expect(index).toBe(2));
});
