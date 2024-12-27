import { RefObject, useEffect, useState } from "react";

export const useIntersection = <T extends HTMLElement>(
  ref: RefObject<T>,
): IntersectionObserverEntry | null => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) =>
      setEntry(entry ?? null),
    );
    observer.observe(ref.current);

    return () => {
      setEntry(null);
      observer.disconnect();
    };
  }, [ref.current]);

  return entry;
};
