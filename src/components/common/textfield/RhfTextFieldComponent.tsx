import { Controller, FieldValues } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { RhfTextfieldProps } from "./Helper";

/**
 * RhfTextfieldComponent
 *
 * A reusable component for rendering text input fields using React Hook Form.
 * It integrates with Material-UI TextField and provides seamless validation and error handling.
 *
 * @component
 * @param {RhfTextfieldProps<TField>} props - Props for the RhfTextfieldComponent.
 * @returns {JSX.Element} Rendered RhfTextfieldComponent.
 */
const RhfTextfieldComponent = <TField extends FieldValues>({
  name,
  control,
  rules,
  label = "",
  size = "small",
  autoComplete = "off",
  autoFocus = false,
  onBlur,
  startAdornment,
  autoCapitalize = false,
  endAdornment,
  ...rest
}: RhfTextfieldProps<TField>): JSX.Element => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            {...field}
            onBlur={() => {
              field.onBlur();
              onBlur && onBlur(field.value);
            }}
            fullWidth
            label={label}
            variant="outlined"
            size={size}
            autoFocus={autoFocus}
            error={Boolean(error)}
            autoComplete={autoComplete}
            helperText={error && error.message}
            inputProps={{
              style: { textTransform: autoCapitalize ? "capitalize" : "none" },
            }}
            InputProps={{
              startAdornment: startAdornment ? startAdornment : undefined,
              endAdornment: endAdornment ? endAdornment : undefined,
            }}
            {...rest}
          />
        );
      }}
    />
  );
};

export default RhfTextfieldComponent;
