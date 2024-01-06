import { useEffect, useState } from "react";
import { ThemeContextProps } from "./Helper";
import { ThemeContext } from "./ThemeContext";
import { darkTheme, lightTheme } from "../../configs/Theme";
import localStorageServices from "../../../../services/storage-services/LocalStorageServices";

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // State hook to manage the Theme state
  const [theme, setTheme] = useState<ThemeContextProps["theme"]>(lightTheme);

  // Effect to store value to local storage
  useEffect(() => {
    const storedThemeMode = localStorageServices.getTheme();
    if (storedThemeMode?.mode === "dark") {
      setTheme(darkTheme);
    }
  }, []);

  // Effect to set the theme mode to local storage
  useEffect(() => {
    if (theme) {
      localStorageServices.setTheme({ mode: theme.palette.mode });
    }
  }, [theme]);
  // Provide the ThemeContext with the current Theme state and the function to update it
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
