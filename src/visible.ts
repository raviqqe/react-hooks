import { type Ref, type RefObject, useMemo, useRef } from "react";
import { useIntersection } from "react-use";

export const useVisible = <T extends HTMLElement>(
  threshold?: number,
): {
  ref: Ref<T | null>;
  visible: boolean;
} => {
  const ref = useRef<T | null>(null);
  const intersection = useIntersection(ref as RefObject<HTMLElement>, {
    threshold,
  });
  const visible = useMemo(
    () => !!intersection?.isIntersecting,
    [intersection?.isIntersecting],
  );

  return { ref, visible };
};
