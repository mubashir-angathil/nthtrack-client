// Importing necessary dependencies and components
import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import {
  Autocomplete,
  AutocompleteChangeReason,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { RhfLabelAutocompleteProps, useRhfLabelAutocomplete } from "./Helper";
import { LabelAutocompleteOptionType } from "../../../../../services/data-services/Helper";

// Component for handling a labeled autocomplete input using react-hook-form
const RhfLabelAutocomplete = <TField extends FieldValues>({
  sx,
  name,
  label,
  control,
  placeholder,
  defaultValue,
  size = "small",
  required = false,
  fullWidth = false,
  variant = "outlined",
  autoFocus = false,
  addNewOption = true,
  onBlur,
}: RhfLabelAutocompleteProps<TField>): JSX.Element => {
  // Destructuring values and functions from the custom hook
  const { open, labels, loading, setOpen, setLoading, handleAddNewOption } =
    useRhfLabelAutocomplete(defaultValue);

  return (
    <>
      {/* Controller component from react-hook-form */}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          const { ref, onChange, value } = field;

          return (
            // Autocomplete component for the labeled input
            <Autocomplete
              sx={sx}
              ref={ref}
              open={open}
              options={labels}
              fullWidth={fullWidth}
              defaultValue={defaultValue}
              id="combo-box-demo"
              onOpen={() => {
                setLoading(true);
                setOpen(true);
              }}
              onClose={() => setOpen(false)}
              value={
                value
                  ? labels.find(
                      (option: LabelAutocompleteOptionType) =>
                        value === option.id,
                    ) ?? null
                  : null
              }
              isOptionEqualToValue={(
                option: LabelAutocompleteOptionType,
                value,
              ) => {
                if (!value) {
                  return false;
                } else {
                  return option.id === value.id;
                }
              }}
              getOptionLabel={(option) => option.name}
              // Custom rendering for each option in the autocomplete dropdown
              renderOption={(
                props: React.HTMLAttributes<HTMLLIElement>,
                option: LabelAutocompleteOptionType,
              ) => (
                <Box key={option.id} component="li" {...props} gap={2}>
                  <Box
                    sx={{
                      background: `rgb(${option.color})`,
                      width: 20,
                      height: 20,
                      borderRadius: 2,
                    }}
                  />
                  <Typography>{option.name}</Typography>
                </Box>
              )}
              // Custom rendering for the input field
              renderInput={(params) => (
                <TextField
                  {...params}
                  size={size}
                  label={label}
                  variant={variant}
                  required={required}
                  autoFocus={autoFocus}
                  placeholder={placeholder}
                  helperText={error?.message}
                  error={Boolean(error?.message)}
                  InputProps={{
                    ...params.InputProps,
                    autoComplete: "new-password",
                    startAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="info" size={20} />
                        ) : null}
                        {params?.InputProps?.endAdornment}
                      </React.Fragment>
                    ),
                    endAdornment: addNewOption ? (
                      // IconButton for adding a new label option
                      <IconButton
                        size="small"
                        title="Add new label"
                        onClick={handleAddNewOption}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    ) : undefined,
                  }}
                />
              )}
              // Handling changes in the autocomplete input
              onChange={(
                _: React.SyntheticEvent<Element, Event>,
                value: LabelAutocompleteOptionType | null,
                reason: AutocompleteChangeReason,
              ) => {
                onChange(reason === "clear" ? -1 : value?.id);
                onBlur && value && reason === "selectOption"
                  ? onBlur(value)
                  : undefined;
              }}
              onBlur={() => {
                field.onBlur();
                onBlur && onBlur();
              }}
            />
          );
        }}
      />
    </>
  );
};

// Exporting the component as the default export
export default RhfLabelAutocomplete;
