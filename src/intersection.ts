import { RefObject, useEffect, useState } from "react";

export const useIntersection = (
  ref: RefObject<HTMLElement>,
): IntersectionObserverEntry | null => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (ref.current) {
      const handler = (entries: IntersectionObserverEntry[]) => {
        setEntry(entries[0]);
      };

      const observer = new IntersectionObserver(handler);
      observer.observe(ref.current);

      return () => {
        setEntry(null);
        observer.disconnect();
      };
    }
    return () => {};
  }, [ref.current]);

  return entry;
};
