import { useAsync } from "./async.js";
import { type Ref } from "react";
import { useVisible } from "./visible.js";

export const useInfiniteScroll = (
  callback: () => Promise<void> | void,
): Ref<HTMLDivElement> => {
  const { ref, visible } = useVisible();

  useAsync(async () => {
    if (visible) {
      await callback();
    }
  }, [callback, visible]);

  return ref;
};
