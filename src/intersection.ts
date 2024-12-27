import { RefObject, useEffect, useState } from "react";

export const useIntersection = <T extends HTMLElement>(
  ref: RefObject<T>,
  options?: IntersectionObserverInit,
): IntersectionObserverEntry | null => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setEntry(entry ?? null),
      options,
    );
    observer.observe(ref.current);

    return () => {
      setEntry(null);
      observer.disconnect();
    };
  }, [ref.current, options?.root, options?.rootMargin, options?.threshold]);

  return entry;
};
