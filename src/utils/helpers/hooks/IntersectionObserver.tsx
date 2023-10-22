import React from "react";

/**
 * Custom React hook to determine if a specified HTML element is currently visible in the viewport.
 *
 * @param {React.RefObject<HTMLElement>} elementRef - Ref object representing the target HTML element.
 * @returns {boolean} - A boolean indicating whether the specified element is currently visible.
 */
const useIsElementVisible = (
  elementRef: React.RefObject<HTMLElement>,
): boolean => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Create an IntersectionObserver to track the visibility of the target element
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });
    // Start observing the target element if it exists
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Cleanup: Disconnect the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, [elementRef]);

  return isVisible;
};

export default useIsElementVisible;
