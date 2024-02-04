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
  maxLength = 1000,
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
        maxLength,
        ...rules,
      }}
      render={({ field, fieldState }) => {
        // Extracting editor data, word count, and character count
        const editorData = field.value || "";
        const characterCount = editorData.length;
        const wordCount = editorData.split(/\s+/).filter(Boolean).length;

        // Styling for error indication
        const errorStyle = {
          border: `1.7px solid ${
            fieldState.error?.message ? "red" : "transparent"
          }`,
        };
        return (
          <>
            {/* Label and indicator for required field */}
            <FormHelperText variant="standard" sx={{ fontSize: 15 }}>
              {label} {required && "*"}
            </FormHelperText>

            {/* CKEditor with error handling and character/word count */}
            <Box
              component="div"
              sx={errorStyle}
              border={1}
              overflow="hidden"
              borderRadius={5}
              borderColor="rgba(0,0,0,0.1)"
              {...field}
            >
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
                  backgroundColor: "white",
                  border: 1,
                  p: 1,
                  borderColor: "transparent",
                }}
              >
                <Box display="-ms-flexbox">
                  {fieldState.error && (
                    <FormHelperText sx={{ color: "error.main", fontSize: 12 }}>
                      {fieldState.error.message}
                    </FormHelperText>
                  )}
                </Box>

                {/* Displaying word and character count */}
                <FormHelperText
                  variant="standard"
                  sx={{ fontSize: 12, color: "GrayText" }}
                >
                  Word: {wordCount} &nbsp; Characters: {characterCount}/
                  {maxLength}
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
