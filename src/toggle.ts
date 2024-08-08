import { useState } from "react";

export const useToggle = (on: boolean): [boolean, () => void] => {
  const [value, setValue] = useState(on);

  return [value, () => setValue((value) => !value)];
};
