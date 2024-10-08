import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

export const useGetScrollPositions = (ref) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const onScroll = useCallback(() => {
    setScrollPosition(ref.current.scrollTop);
  }, [ref]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDebouncedScroll = useCallback(debounce(onScroll, 40), [onScroll]);

  useEffect(() => {
    if (!ref.current) return null;

    ref.current.addEventListener("scroll", onDebouncedScroll, true);

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ref.current.removeEventListener("scroll", onDebouncedScroll, true);
      }
    };
  });

  return scrollPosition;
};
