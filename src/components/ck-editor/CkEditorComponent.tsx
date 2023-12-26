import { Controller, FieldValues } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormHelperText } from "@mui/material";
import { Box } from "@mui/system";
import {
  RhfCkEditorProps,
  editorConfiguration,
  useCkEditorComponent,
} from "./Helper";

/**
 * RhfCKEditorComponent
 *
 * A React component that integrates CKEditor with React Hook Form and Material-UI TextField.
 * Provides seamless validation, error handling, and character/word count features.
 *
 * @component
 * @param {RhfTextfieldProps<TField>} props - Props for the RhfCKEditorComponent.
 * @returns {JSX.Element} Rendered RhfCKEditorComponent.
 */
const RhfCKEditorComponent = <TField extends FieldValues>({
  // Props destructuring
  name,
  control,
  label,
  required = false,
  rules,
  height,
  onBlur,
}: RhfCkEditorProps<TField>): JSX.Element => {
  // Custom hook for CKEditor functionality
  const {
    handleEditorChange,
    handleEditorBlur,
    handleEditorOnReady,
    handleEditorOnFocus,
  } = useCkEditorComponent();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        maxLength: 1000,
        ...rules,
      }}
      render={({ field, fieldState: { error } }) => {
        // Extracting editor data, word count, and character count
        const editorData = field.value || "";
        const characterCount = editorData.length;
        const wordCount = editorData.split(/\s+/).filter(Boolean).length;

        // Styling for error indication
        const errorStyle = {
          border: `1.7px solid ${error?.message ? "red" : "transparent"}`,
        };

        return (
          <>
            {/* Label and indicator for required field */}
            <FormHelperText variant="standard" sx={{ fontSize: 15 }}>
              {label} {required && "*"}
            </FormHelperText>

            {/* CKEditor with error handling and character/word count */}
            <Box component="div" sx={errorStyle} border={5}>
              <CKEditor
                editor={ClassicEditor}
                data={editorData}
                config={editorConfiguration}
                onChange={(event: any, editor: ClassicEditor) =>
                  handleEditorChange(event, editor, field)
                }
                onReady={(editor) => handleEditorOnReady(editor, height)}
                onFocus={handleEditorOnFocus}
                onBlur={(event: any, editor: ClassicEditor) =>
                  handleEditorBlur(event, editor, field, onBlur)
                }
                ref={field.ref}
                disabled={field.disabled}
              />

              {/* Error messages and character/word count display */}
              <Box
                display="flex"
                justifyContent="space-between"
                sx={{
                  backgroundColor: "background.paper.main",
                  border: 1,
                  p: 1,
                  borderColor: "rgba(0,0,0,0.2)",
                }}
              >
                <Box display="-ms-flexbox">
                  {error && (
                    <FormHelperText sx={{ color: "error.main", fontSize: 12 }}>
                      {error.message}
                    </FormHelperText>
                  )}
                </Box>

                {/* Displaying word and character count */}
                <FormHelperText variant="standard" sx={{ fontSize: 12 }}>
                  Word: {wordCount} &nbsp; Characters: {characterCount}/1000
                </FormHelperText>
              </Box>
            </Box>
          </>
        );
      }}
    />
  );
};

export default RhfCKEditorComponent;
