import { Controller, FieldValues } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { RhfTextfieldProps } from "../common/textfield/Helper";
import { FormHelperText, FormLabel } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { RhfCkEditorProps, editorConfiguration } from "./Helper";

/**
 * RhfCKEditorComponent
 *
 * A reusable component for rendering CKEditor using React Hook Form.
 * It integrates with Material-UI TextField and provides seamless validation and error handling.
 *
 * @component
 * @param {RhfTextfieldProps<TField>} props - Props for the RhfCKEditorComponent.
 * @returns {JSX.Element} Rendered RhfCKEditorComponent.
 */
const RhfCKEditorComponent = <TField extends FieldValues>({
  name,
  control,
  label,
  required,
  rules,
}: RhfCkEditorProps<TField>): JSX.Element => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            <FormHelperText variant="standard" sx={{ fontSize: 15 }}>
              {label} {required && "*"}
            </FormHelperText>
            <Box
              style={{
                border: `1.7px solid ${error ? "red" : "transparent"}`,
                borderRadius: "4px",
                marginBottom: "8px",
              }}
            >
              <CKEditor
                editor={ClassicEditor}
                data={field.value || ""}
                config={editorConfiguration}
                onChange={(_, editor) => field.onChange(editor.getData())}
              />
            </Box>
            {error && (
              <FormHelperText sx={{ color: "error.main" }}>
                {error.message}
              </FormHelperText>
            )}
          </>
        );
      }}
    />
  );
};

export default RhfCKEditorComponent;
