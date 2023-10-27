import { Controller, FieldValues } from "react-hook-form";
import { RhfSelectProps } from "./Helper";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";

/**
 * RhfTextfieldComponent
 *
 * A reusable component for rendering text input fields using React Hook Form.
 * It integrates with Material-UI TextField and provides seamless validation and error handling.
 *
 * @component
 * @param {RhfSelectProps<TField>} props - Props for the RhfTextfieldComponent.
 * @returns {JSX.Element} Rendered RhfTextfieldComponent.
 */
const RhfSelectComponent = <TField extends FieldValues>({
  name,
  control,
  rules,
  label = "",
  size = "small",
  ...rest
}: RhfSelectProps<TField>): JSX.Element => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormControl required sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-required-label">
              {label}
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              size={size}
              onClose={handleClose}
              onOpen={handleOpen}
              label={label}
              value={field.value ?? ""}
              error={Boolean(error?.message)}
              onChange={(e) => {
                return field.onChange(e);
              }}
              {...rest}
            >
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Bug</MenuItem>
              <MenuItem value={2}>Feature</MenuItem>
            </Select>
            {error && (
              <FormHelperText sx={{ color: "red" }}>
                {error?.message}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};

export default RhfSelectComponent;
