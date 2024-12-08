import { type Ref, type RefObject, useEffect, useRef, useState } from "react";
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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible((visible) => visible || !!intersection?.isIntersecting);
  }, [intersection?.isIntersecting]);

  return { ref, visible };
};
