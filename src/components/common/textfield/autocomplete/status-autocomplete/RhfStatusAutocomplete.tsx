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
import { RhfStatusAutocompleteProps, useRhfStatusAutocomplete } from "./Helper";
import { StatusAutocompleteOptionType } from "../../../../../services/data-services/Helper";

// Component for handling a status-labeled autocomplete input using react-hook-form
const RhfStatusAutocomplete = <TField extends FieldValues>({
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
  onBlur,
}: RhfStatusAutocompleteProps<TField>): JSX.Element => {
  // Destructuring values and functions from the custom hook
  const { open, statuses, loading, setOpen, setLoading, handleAddNewOption } =
    useRhfStatusAutocomplete(defaultValue);

  // Using the Controller component from react-hook-form
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          const { ref, onChange, value } = field;

          // Autocomplete component for the status-labeled input
          return (
            <Autocomplete
              sx={sx}
              ref={ref}
              open={open}
              options={statuses}
              fullWidth={fullWidth}
              id="combo-box-demo"
              onOpen={() => {
                setLoading(true);
                setOpen(true);
              }}
              onClose={() => setOpen(false)}
              value={
                value
                  ? statuses.find(
                      (option: StatusAutocompleteOptionType) =>
                        value === option.id,
                    ) ?? null
                  : null
              }
              isOptionEqualToValue={(
                option: StatusAutocompleteOptionType,
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
                option: StatusAutocompleteOptionType,
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
                  placeholder={placeholder}
                  helperText={error?.message}
                  error={Boolean(error?.message)}
                  autoFocus={autoFocus}
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
                    endAdornment: (
                      // IconButton for adding a new status option
                      <IconButton
                        size="small"
                        title="Add new Status"
                        onClick={handleAddNewOption}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    ),
                  }}
                />
              )}
              // Handling changes in the autocomplete input
              onChange={(
                _: React.SyntheticEvent<Element, Event>,
                value: StatusAutocompleteOptionType | null,
                reason: AutocompleteChangeReason,
              ) => {
                onChange(reason === "clear" ? -1 : value?.id);
                onBlur && value && reason === "selectOption"
                  ? onBlur(value)
                  : undefined;
              }}
              onBlur={() => {
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
export default RhfStatusAutocomplete;
