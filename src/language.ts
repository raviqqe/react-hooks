import { startTransition, useEffect, useState } from "react";

export const useLanguage = (defaultLanguage: string): string => {
  const [language, setLanguage] = useState(defaultLanguage);

  useEffect(() => {
    startTransition(() => setLanguage(window.navigator.language));
  }, []);

  return language;
};
