import { useEffect, useRef } from "react";

// export const useObserver = (ref, callbackFunction) => {
//   const observerRef = useRef(null);
//
//   useEffect(() => {
//     if (observerRef.current) observerRef.current.disconnect();
//
//     const callback = (entries) => {
//       if (entries.at(0).isIntersecting) {
//         console.log(entries.at(0).isIntersecting);
//         callbackFunction();
//       }
//     };
//
//     observerRef.current = new IntersectionObserver(callback);
//     observerRef.current.observe(ref.current);
//   }, [callbackFunction, ref]);
// };

export const useObserver = (elemRef, callbackFunction) => {
  const observerRef = useRef(null);
  const hasIntersectedRef = useRef(false); // Track if the element has been observed initially

  useEffect(() => {
    if (!elemRef.current) return;

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!hasIntersectedRef.current) {
            hasIntersectedRef.current = true;
          } else {
            callbackFunction();
          }
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    observerRef.current.observe(elemRef.current);

    // eslint-disable-next-line consistent-return
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callbackFunction, elemRef]); // Dependencies
};
