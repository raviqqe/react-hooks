import { type RefObject, useMemo } from "react";
import { useIntersection } from "./intersection.js";

export const useVisible = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  threshold?: number,
): boolean => {
  const intersection = useIntersection(ref, {
    threshold,
  });
  const visible = useMemo(
    () => !!intersection?.isIntersecting,
    [intersection?.isIntersecting],
  );

  return visible;
};
