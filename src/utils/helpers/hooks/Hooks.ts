import { useCallback } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

// Custom hook for navigation-related functionality
export const useGeneralHooks = () => {
  // Retrieve the navigate function from react-router-dom
  const navigate: NavigateFunction = useNavigate();

  // Define a memoized version of the navigation function with useCallback
  const customNavigate = useCallback(
    (dir: "Backward" | "forward" | "reload") => {
      // Use the navigate function to navigate based on the provided direction
      navigate(dir === "Backward" ? -1 : dir === "forward" ? 1 : 0);
    },
    [navigate], // Dependency array includes navigate to ensure stable reference
  );

  // Return the customNavigate function for use in components
  return { customNavigate };
};
