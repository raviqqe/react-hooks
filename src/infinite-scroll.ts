import { type Ref } from "react";
import { useAsync } from "./async.js";
import { useVisible } from "./visible.js";

export const useInfiniteScroll = <T extends HTMLElement>(
  callback: () => Promise<void> | void,
): Ref<T> => {
  const { ref, visible } = useVisible<T>();

  useAsync(async () => {
    if (visible) {
      await callback();
    }
  }, [callback, visible]);

  return ref;
};
