import { useEffect, useRef } from "react";

export const useObserver = (ref, callbackFunction) => {
  const observerRef = useRef(null);
  const hasIntersectedRef = useRef(false);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    const callback = (entries) => {
      if (entries.at(0).isIntersecting) {
        if (!hasIntersectedRef.current) {
          hasIntersectedRef.current = true;
        } else {
          callbackFunction();
        }
      }
    };

    observerRef.current = new IntersectionObserver(callback);
    observerRef.current.observe(ref.current);

    // eslint-disable-next-line consistent-return
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callbackFunction, ref]);
};
