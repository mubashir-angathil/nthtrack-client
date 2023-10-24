import { Control, FieldValues, Path } from "react-hook-form";

export interface RhfCkEditorProps<TField extends FieldValues> {
  name: Path<TField>;
  control: Control<TField>;
  label: string;
  rules?: Record<string, unknown>; // Update the type based on your rules
  required?: boolean;
}

export const editorConfiguration = {
  toolbar: [
    "undo",
    "redo",
    "|",
    "heading",
    "|",
    "bold",
    "italic",
    "|",
    "numberedList",
    "bulletedList",
  ],
};
