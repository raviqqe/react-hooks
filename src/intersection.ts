import { RefObject, useEffect, useState } from "react";

export const useIntersection = (
  ref: RefObject<HTMLElement>,
): IntersectionObserverEntry | null => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(([entry]) =>
        setEntry(entry ?? null),
      );
      observer.observe(ref.current);

      return () => {
        setEntry(null);
        observer.disconnect();
      };
    }
  }, [ref.current]);

  return entry;
};
