import { act, render, waitFor } from "@testing-library/react";
import { vi, beforeEach, afterEach, expect, it } from "vitest";
import { useDebounce } from "./debounce.js";

interface Props {
  value: number;
  onChange: () => void;
}

const Component = ({ value, onChange }: Props) => {
  useDebounce(onChange, 1, [value]);

  return null;
};

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
});

it("runs without any error", () => {
  render(<Component onChange={() => {}} value={1} />);
});

it("runs a callback", async () => {
  let index = 0;

  await act(() => render(<Component onChange={() => index++} value={1} />));

  await waitFor(() => expect(index).toBe(1));
});

it("runs a callback twice", async () => {
  let index = 0;

  const renderComponent = (value: number) =>
    render(
      <Component
        onChange={() => {
          index++;
        }}
        value={value}
      />
    );

  await act(() => renderComponent(1));

  await waitFor(() => expect(index).toBe(1));

  await act(() => renderComponent(2));

  await waitFor(() => expect(index).toBe(2));
});

it("debounces two calls into one", async () => {
  let index = 0;

  const { rerender } = await act(() =>
    render(<Component onChange={() => index++} value={0} />)
  );

  const renderComponent = (value: number) =>
    act(() => rerender(<Component onChange={() => index++} value={value} />));

  renderComponent(1);

  await waitFor(() => expect(index).toBe(1));

  renderComponent(2);

  await waitFor(() => expect(index).toBe(2));
});

it("debounces three calls into one", async () => {
  let index = 0;

  const renderComponent = (value: number) =>
    render(
      <Component
        onChange={() => {
          index++;
        }}
        value={value}
      />
    );

  await act(() => renderComponent(1));
  await act(() => renderComponent(2));
  await act(() => renderComponent(3));

  await waitFor(() => expect(index).toBe(1));

  await act(() => renderComponent(3));

  await waitFor(() => expect(index).toBe(2));
});
