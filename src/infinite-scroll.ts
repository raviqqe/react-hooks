import { type RefObject } from "react";
import { useAsync } from "./async.js";
import { useVisible } from "./visible.js";

export const useInfiniteScroll = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => Promise<void> | void,
): void => {
  const visible = useVisible<T>(ref);

  useAsync(async () => {
    if (visible) {
      await callback();
    }
  }, [callback, visible]);
};
