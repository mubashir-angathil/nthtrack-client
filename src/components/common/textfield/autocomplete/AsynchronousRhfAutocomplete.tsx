import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import {
  Autocomplete,
  TextField,
  TextFieldProps,
  CircularProgress,
  AutocompleteInputChangeReason,
  AutocompleteChangeReason,
  ListItem,
} from "@mui/material";
import {
  ASYNCHRONOUS_RHF_AUTOCOMPLETE_HOOKS_HELPERS,
  ASYNCHRONOUS_RHF_AUTOCOMPLETE_UTIL_HELPERS,
  AsynchronousRhfAutocompleteProps,
} from "./Helper";
import { AutocompleteOptionType } from "../../../../services/data-services/Helper";
const AsynchronousRhfAutocomplete = <TField extends FieldValues>({
  sx,
  name,
  label,
  control,
  apiDetails,
  placeholder,
  defaultValue,
  size = "small",
  required = false,
  variant = "outlined",
  noOptionsText = "No options",
}: AsynchronousRhfAutocompleteProps<TField>): JSX.Element => {
  const [open, setOpen] = React.useState(false);

  // Destructure the necessary variables and functions from the useOptionsFetch hook's return value.
  // These variables and functions are used to manage the asynchronous fetching of options for the Autocomplete component.
  const { loading, options, fetch, setFetch, setOptions } =
    ASYNCHRONOUS_RHF_AUTOCOMPLETE_HOOKS_HELPERS.useOptionsFetch({
      open,
      apiDetails,
      defaultValue,
    });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { ref, onChange, value } = field;
        return (
          <Autocomplete
            sx={sx}
            ref={ref}
            open={open}
            fullWidth={true}
            loading={loading}
            options={options}
            defaultValue={defaultValue}
            renderOption={(
              props: React.HTMLAttributes<HTMLLIElement>,
              option,
            ) => (
              <ListItem key={option.id} {...props}>
                {option.username}
                <br />
                {option.email}
              </ListItem>
            )}
            filterOptions={() => options}
            noOptionsText={noOptionsText}
            onClose={() => setOpen(false)}
            getOptionLabel={(option) => option?.username}
            onOpen={() => setOpen(true)}
            renderInput={(params: TextFieldProps) => (
              <TextField
                {...params}
                size={size}
                label={label}
                inputRef={ref}
                variant={variant}
                required={required}
                error={!!error?.message}
                placeholder={placeholder}
                helperText={error?.message}
                InputProps={{
                  ...params.InputProps,
                  autoComplete: "new-password",
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="info" size={20} />
                      ) : null}
                      {params?.InputProps?.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
            value={
              value
                ? options.find(
                    (option: AutocompleteOptionType) => value === option.id,
                  ) ?? null
                : null
            }
            isOptionEqualToValue={(option: AutocompleteOptionType, value) => {
              if (!value) {
                return false;
              } else {
                return option.id === value.id;
              }
            }}
            onChange={(
              _,
              value: AutocompleteOptionType | null,
              reason: AutocompleteChangeReason,
            ) => {
              // Determine the final value to be passed to the onChange function based on the reason
              // If the reason is 'clear', pass undefined as the value
              // Otherwise, pass the ID of the selected value
              return onChange(reason === "clear" ? undefined : value?.id);
            }}
            onInputChange={(
              _,
              value: string,
              reason: AutocompleteInputChangeReason,
            ) =>
              ASYNCHRONOUS_RHF_AUTOCOMPLETE_UTIL_HELPERS.handleInputChange({
                reason,
                setFetch,
                setOpen,
                setOptions,
                value,
              })
            }
            ListboxProps={{
              onScroll: (event: React.SyntheticEvent) => {
                const listboxNode = event.currentTarget;
                if (
                  Math.abs(
                    listboxNode.scrollTop +
                      listboxNode.clientHeight -
                      listboxNode.scrollHeight,
                  ) < 1
                ) {
                  if (fetch.hasMore) {
                    setFetch((fetch) => {
                      return { ...fetch, page: fetch.page + 1 };
                    });
                  }
                }
              },
            }}
          />
        );
      }}
    />
  );
};
export default AsynchronousRhfAutocomplete;
