import { useAsync } from "@raviqqe/react-hooks";
import { type Ref } from "react";
import { useVisible } from "./visible";

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
