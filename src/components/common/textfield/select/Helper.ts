import { Control, FieldValues, Path } from "react-hook-form";

export interface RhfSelectProps<TField extends FieldValues> {
  name: Path<TField>;
  control: Control<TField>;
  label?: string;
  rules?: Record<string, unknown>; // Update the type based on your rules
  size?: "small" | "medium";
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}
