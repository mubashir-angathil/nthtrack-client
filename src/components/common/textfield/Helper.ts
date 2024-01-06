/* eslint-disable no-unused-vars */
import { SxProps } from "@mui/system";
import React, { HTMLInputTypeAttribute } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

export interface RhfTextfieldProps<TField extends FieldValues> {
  name: Path<TField>;
  control: Control<TField>;
  label?: string;
  rules?: Record<string, unknown>; // Update the type based on your rules
  size?: "small" | "medium";
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  margin?: "normal" | "dense";
  autoComplete?: string;
  autoFocus?: boolean;
  sx?: SxProps;
  startAdornment?: JSX.Element;
  endAdornment?: React.JSX.Element;
  onBlur?: (value?: string) => void;
}
