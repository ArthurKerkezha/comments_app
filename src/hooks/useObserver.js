import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

export const useObserver = (ref, callbackFunction) => {
  const observerRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    const callback = (entries, observer) => {
      if (entries.at(0).isIntersecting) {
        callbackFunction();
      }
    };

    observerRef.current = new IntersectionObserver(callback);
    observerRef.current.observe(ref.current);
  }, [callbackFunction, dispatch, ref]);
};
