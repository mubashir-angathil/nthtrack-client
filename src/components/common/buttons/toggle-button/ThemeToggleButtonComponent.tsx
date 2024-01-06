import { ToggleButton } from "@mui/material";
import React from "react";
import { useThemeContext } from "../../../../utils/helpers/context/theme-context/ThemeContext";
import { darkTheme, lightTheme } from "../../../../utils/helpers/configs/Theme";
import { DarkMode, LightMode } from "@mui/icons-material";
const ThemeToggleButtonComponent: React.FC = () => {
  const { theme, setTheme } = useThemeContext();
  const darkMode = theme.palette.mode === "dark";
  return (
    <ToggleButton
      value="check"
      selected={darkMode}
      onChange={() =>
        setTheme((prevTheme) =>
          prevTheme.palette.mode === "dark" ? lightTheme : darkTheme,
        )
      }
      size="small"
      sx={{
        borderRadius: 10,
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 10000,
      }}
      color={darkMode ? "warning" : "primary"}
    >
      {darkMode ? <LightMode /> : <DarkMode />}
    </ToggleButton>
  );
};

export default ThemeToggleButtonComponent;
