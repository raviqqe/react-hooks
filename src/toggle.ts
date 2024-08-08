import { useState } from "react";

export const useToggle = (on: boolean) => {
  const [value, setValue] = useState(on);

  return [value, () => setValue((value) => !value)];
};
