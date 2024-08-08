import { startTransition, useEffect, useState } from "react";
import { isBrowser } from "../utility.js";

export const useBrowser = (): boolean => {
  const [browser, setBrowser] = useState<boolean>(false);

  useEffect(() => {
    startTransition(() => setBrowser(isBrowser));
  }, []);

  return browser;
};
