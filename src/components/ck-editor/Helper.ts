import {
  Control,
  FieldValues,
  Path,
  ControllerRenderProps,
} from "react-hook-form";

// Define an interface that extends EditorConfig
export interface RhfCkEditorProps<TField extends FieldValues> {
  name: Path<TField>;
  control: Control<TField>;
  label: string;
  rules?: Record<string, unknown>; // Update the type based on your rules
  required?: boolean;
}

// Configuration for CKEditor toolbar
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

// Custom hook for CKEditor functionality
export const useCkEditorComponent = () => {
  // Handle editor content change
  const handleEditorChange = <TField extends FieldValues>(
    _: any,
    editor: any,
    field: ControllerRenderProps<TField, Path<TField>>,
  ) => {
    const content = editor.getData();
    field.onChange(content);
  };

  // Adjust editor height on ready
  const handleEditorOnReady = (editor: any) => {
    editor.editing.view.change((writer: any) => {
      writer.setStyle(
        "height",
        "200px",
        editor.editing.view.document.getRoot(),
      );
    });
  };

  // Return functions for use in RhfCKEditorComponent
  return {
    handleEditorChange,
    handleEditorOnReady,
  };
};
