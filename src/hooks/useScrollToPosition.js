import { useEffect } from "react";

export const useScrollToPosition = (
  ref,
  position,
  isShouldScroll = true,
  delay = 555,
) => {
  useEffect(() => {
    if (!ref.current || !isShouldScroll) return;

    setTimeout(() => {
      ref.current.scroll({
        top: position,
        behavior: "smooth",
      });
    }, delay);
  }, []);
};
