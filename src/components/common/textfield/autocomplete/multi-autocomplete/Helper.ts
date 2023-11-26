/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import axios, { AxiosResponse, CancelToken } from "axios";
import { Path, Control, FieldValues, UseFormSetValue } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import { ByUserDetails } from "../../../../../services/project-services/Helper";

export interface AutocompleteApiProps {
  cancelToken?: CancelToken;
}
export declare type AutocompleteOptionAPI = (
  props: AutocompleteApiProps,
) => Promise<AxiosResponse<ByUserDetails[], any>>;

export interface ApiDetailsType {
  reset?: boolean;
  api?: AutocompleteOptionAPI;
}
export interface AsynchronousRhfMultiAutocompleteProps<
  TField extends FieldValues,
> {
  label: string;
  name: Path<TField>;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  sx?: SxProps<Theme>;
  placeholder?: string;
  noOptionsText?: string;
  useFormHooks: {
    control: Control<TField>;
    setValue?: UseFormSetValue<TField>;
  };
  size?: "medium" | "small";
  apiDetails: ApiDetailsType;
  defaultValues?: ByUserDetails[];
  variant?: "outlined" | "standard" | "filled";
}

interface ApiHandlerProps {
  cancelToken?: CancelToken;
  apiDetails: ApiDetailsType;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setOptions: React.Dispatch<React.SetStateAction<ByUserDetails[]>>;
}

interface UseOptionFetchProps {
  open: boolean;
  apiDetails: ApiDetailsType;
  name: Path<FieldValues>;
  setValue?: UseFormSetValue<any>;
  defaultValues?: ByUserDetails[] | [];
}

export const ASYNCHRONOUS_RHF_MULTIPLE_AUTOCOMPLETE_UTIL_HELPERS = {
  apiHandler: ({
    apiDetails,
    setLoading,
    setOptions,
    cancelToken,
  }: ApiHandlerProps) => {
    if (apiDetails?.api) {
      setLoading(true); // set loading true
      const { api } = apiDetails; // destruct apiDetails

      /* a. Make api call for fetching data
         b. Pass the cancel token to the API request for cancel unwanted request when user enter each request
      */
      api({ cancelToken })
        .then((response: any) => {
          const { data, status } = response;
          // If api response status 200 then proceed further operations
          if (status === 200) {
            setLoading(false);
            setOptions((prevOptions) => {
              const CONCATENATED_ARRAY = prevOptions.concat(data.data ?? []);

              const UNIQUE_ARRAY = CONCATENATED_ARRAY.filter(
                (item, index, array) =>
                  index === array.findIndex((i) => i.id === item.id),
              );

              return UNIQUE_ARRAY;
            });
          } else setLoading(false); // if response returns other status then set loading false with previous array options
        })
        .catch((error) => {
          // if request return cancelation error then return by default
          if (axios.isCancel(error)) return;

          setLoading(false); // set loading false

          // log error message and return a toast message
          console.error("Error:", error.message);
          enqueueSnackbar({
            message: error.response?.data?.message ?? error?.message,
            variant: "error",
          });
        });
    }
  },
};

export const ASYNCHRONOUS_RHF_MULTIPLE_AUTOCOMPLETE_HOOKS_HELPERS = {
  useOptionsFetch: ({
    apiDetails,
    open,
    defaultValues,
    setValue,
    name,
  }: UseOptionFetchProps) => {
    const [options, setOptions] = React.useState<ByUserDetails[]>([]);
    const [loading, setLoading] = React.useState(false);

    // Default value
    React.useEffect(() => {
      if (defaultValues && setValue && defaultValues.length !== 0) {
        setOptions(defaultValues);
        setValue(name, defaultValues);
      }
    }, [defaultValues]);

    // fetch
    React.useEffect(() => {
      let cancel: any; // Declare variable to axios cancel callback

      /* Call API to fetch options, if the auto-completion  is opened and the selectAllOptions being undefined. */

      if (open) {
        ASYNCHRONOUS_RHF_MULTIPLE_AUTOCOMPLETE_UTIL_HELPERS.apiHandler({
          apiDetails,
          setLoading,
          setOptions,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
      }
      if (!apiDetails?.api) {
        setOptions([]);
      }
      return () => cancel; // Invoke the cancel function in the cleanup function
    }, [open]);

    return {
      options,
      loading,
    };
  },
};
