import { startTransition, useEffect, useState } from "react";

export const useLocale = (): string => {
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    startTransition(() => setLocale(window.navigator.language));
  }, []);

  return locale;
};
