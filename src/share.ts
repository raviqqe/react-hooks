import { startTransition, useEffect, useState } from "react";

type ShareFunction = (url: string) => Promise<void>;

export const useShare = (): ShareFunction | null => {
  const [share, setShare] = useState<ShareFunction | null>(null);

  useEffect(() => {
    if (!window.navigator.share) {
      return;
    }

    startTransition(() =>
      setShare(() => async (url: string) => {
        try {
          await window.navigator.share({ url });
        } catch (error) {
          if (error instanceof Error && error.message === "Share canceled") {
            return;
          }

          throw error;
        }
      }),
    );
  }, []);

  return share;
};
