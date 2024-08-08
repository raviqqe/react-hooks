import { startTransition, useEffect, useState } from "react";

export const useLocale = (language: string): string => {
  const [locale, setLocale] = useState(language);

  useEffect(() => {
    startTransition(() => setLocale(window.navigator.language));
  }, []);

  return locale;
};
