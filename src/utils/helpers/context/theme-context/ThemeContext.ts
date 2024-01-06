import { createContext, useContext } from "react";
import { ThemeContextProps } from "./Helper";
import { lightTheme } from "../../configs/Theme";

// Creating the ThemeContext with default values
export const ThemeContext = createContext<ThemeContextProps>({
  theme: lightTheme,
  setTheme: () => {},
});

// Custom hook to consume the ThemeContext
export const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);

  // Throw an error if the hook is used outside of the context provider
  if (!themeContext) {
    throw new Error("useThemeContext must be used within a FormProvider");
  }

  return themeContext;
};
