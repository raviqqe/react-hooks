import { startTransition, useEffect, useState } from "react";

export const useBrowser = (): boolean => {
  const [browser, setBrowser] = useState(false);

  useEffect(() => {
    startTransition(() => setBrowser(typeof window === "object"));
  }, []);

  return browser;
};
