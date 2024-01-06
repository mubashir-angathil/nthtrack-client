import { Theme } from "@mui/material";
import React from "react";

// Defining the shape of the Theme context state
export interface ThemeContextProps {
  theme: Theme; // State
  setTheme: React.Dispatch<React.SetStateAction<Theme>>; // Setter function
}
