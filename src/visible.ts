import { type Ref, useMemo, useRef } from "react";
import { useIntersection } from "./intersection.js";

export const useVisible = <T extends HTMLElement>(
  threshold?: number,
): {
  ref: Ref<T | null>;
  visible: boolean;
} => {
  const ref = useRef<T | null>(null);
  const intersection = useIntersection(ref, {
    threshold,
  });
  const visible = useMemo(
    () => !!intersection?.isIntersecting,
    [intersection?.isIntersecting],
  );

  return { ref, visible };
};
