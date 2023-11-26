import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Tooltip,
  Checkbox,
  TextFieldProps,
} from "@mui/material";
import {
  ASYNCHRONOUS_RHF_MULTIPLE_AUTOCOMPLETE_HOOKS_HELPERS,
  AsynchronousRhfMultiAutocompleteProps,
} from "./Helper";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { ByUserDetails } from "../../../../../services/project-services/Helper";

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

const RhfMultiUsersAutocomplete = <TField extends FieldValues>({
  sx,
  name,
  label,
  apiDetails,
  placeholder,
  useFormHooks,
  defaultValues,
  size = "small",
  disabled = false,
  readOnly = false,
  required = false,
  variant = "outlined",
  noOptionsText = "No options",
}: AsynchronousRhfMultiAutocompleteProps<TField>): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const { control, setValue } = useFormHooks;
  // Destructure the necessary variables and functions from the useOptionsFetch hook's return value.
  // These variables and functions are used to manage the asynchronous fetching of options for the Autocomplete component.
  const { loading, options } =
    ASYNCHRONOUS_RHF_MULTIPLE_AUTOCOMPLETE_HOOKS_HELPERS.useOptionsFetch({
      open,
      name,
      setValue,
      apiDetails,
      defaultValues,
    });
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { value, ref, onChange } = field;
        return (
          <Autocomplete
            sx={sx}
            ref={ref}
            multiple
            open={open}
            fullWidth={true}
            loading={loading}
            options={options}
            readOnly={readOnly}
            disabled={disabled}
            disableCloseOnSelect
            defaultValue={defaultValues}
            value={Array.isArray(value) ? value : []}
            isOptionEqualToValue={(option: ByUserDetails, value) => {
              if (!value) {
                return false;
              } else {
                return option.id === value.id;
              }
            }}
            onChange={(_, options: ByUserDetails[]) => {
              return onChange(options || []);
            }}
            noOptionsText={noOptionsText}
            onClose={() => setOpen(false)}
            getOptionLabel={(option: ByUserDetails) => option.username}
            onOpen={readOnly ? undefined : () => setOpen(true)}
            renderOption={(props, option, { selected }) => {
              return (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    size={size}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option?.username}
                </li>
              );
            }}
            renderInput={(params: TextFieldProps) => {
              return (
                <Tooltip
                  title={
                    readOnly
                      ? "Read only field"
                      : disabled
                      ? "Disabled field"
                      : ""
                  }
                  arrow
                  disableInteractive
                >
                  <TextField
                    {...params}
                    size={size}
                    label={label}
                    variant={variant}
                    required={required}
                    error={typeof error !== "undefined"}
                    placeholder={placeholder}
                    helperText={
                      Array.isArray(error) ? error[0]?.message : undefined
                    }
                    color={readOnly ? "success" : undefined}
                    InputProps={{
                      ...params.InputProps,
                      autoComplete: "new-password",
                      endAdornment: readOnly ? undefined : (
                        <React.Fragment>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params?.InputProps?.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                </Tooltip>
              );
            }}
          />
        );
      }}
    />
  );
};
export default RhfMultiUsersAutocomplete;
