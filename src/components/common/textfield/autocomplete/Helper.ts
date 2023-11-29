/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Theme } from "@emotion/react";
import {
  AutocompleteInputChangeReason,
  SxProps,
  debounce,
} from "@mui/material";
import axios, { AxiosResponse, CancelToken } from "axios";
import { Path, Control, FieldValues } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import {
  AutocompleteOptionType,
  AutocompleteResponse,
} from "../../../../services/data-services/Helper";
import { ApiError } from "../../../../services/Helper";

export interface AutocompleteApiProps {
  limit: number;
  searchKey?: string;
  page: number;
  cancelToken?: CancelToken;
}
export declare type AutocompleteOptionAPI = (
  props: AutocompleteApiProps,
) => Promise<AxiosResponse<AutocompleteResponse, any>>;
export interface ApiDetailsType {
  api?: AutocompleteOptionAPI;
}
interface DependedFieldDetailsType {
  id?: number | null;
}

export interface AsynchronousRhfAutocompleteProps<TField extends FieldValues> {
  label: string;
  name: Path<TField>;
  required?: boolean;
  sx?: SxProps<Theme>;
  placeholder?: string;
  noOptionsText?: string;
  control: Control<TField>;
  size?: "medium" | "small";
  apiDetails: ApiDetailsType;
  defaultValue?: AutocompleteOptionType;
  variant?: "outlined" | "standard" | "filled";
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: any,
  ) => React.ReactNode;
}
export interface FetchStateType {
  page: number;
  limit: number;
  searchKey?: string;
  clear?: boolean;
  hasMore: boolean;
  optionsLength: number;
}
interface ApiHandlerProps {
  fetch: FetchStateType;
  cancelToken?: CancelToken;
  apiDetails: ApiDetailsType;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFetch: React.Dispatch<React.SetStateAction<FetchStateType>>;
  setOptions: React.Dispatch<React.SetStateAction<AutocompleteOptionType[]>>;
}
interface HandleInputChangeProps {
  value: string;
  reason: AutocompleteInputChangeReason;
  event?: React.SyntheticEvent<Element, Event>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFetch: React.Dispatch<React.SetStateAction<FetchStateType>>;
  setOptions: React.Dispatch<React.SetStateAction<AutocompleteOptionType[]>>;
}
interface DebounceInputChangeProps {
  value: string;
  setFetch: React.Dispatch<React.SetStateAction<FetchStateType>>;
}
interface UseOptionFetchProps {
  open: boolean;
  apiDetails: ApiDetailsType;
  defaultValue?: AutocompleteOptionType;
  dependedFieldDetails?: DependedFieldDetailsType;
}

export const ASYNCHRONOUS_RHF_AUTOCOMPLETE_UTIL_HELPERS = {
  apiHandler: async ({
    apiDetails,
    fetch,
    setFetch,
    setLoading,
    setOptions,
    cancelToken,
  }: ApiHandlerProps) => {
    try {
      if (apiDetails?.api) {
        setLoading(true); // set loading true
        const { api } = apiDetails; // destruct apiDetails

        // Make api call for fetching data
        const response = await api({
          limit: fetch.limit,
          page: fetch.page,
          searchKey: fetch?.searchKey,
          cancelToken,
        });

        const { data, success, totalRows } =
          response.data as unknown as AutocompleteResponse;

        // If api response status 200 then proceed further operations
        if (response.status === 200 && success) {
          const LENGTH = data?.length ?? 0;

          // set length of current options
          setFetch((prevFetch) => {
            const OPTIONS_LENGTH = prevFetch.optionsLength + LENGTH;
            const updatedFetch = {
              ...prevFetch,
              optionsLength: OPTIONS_LENGTH,
            };

            if (OPTIONS_LENGTH === totalRows) {
              return { ...updatedFetch, hasMore: false };
            }
            return updatedFetch;
          });

          // if length below fetch.count set hasMore false
          if (LENGTH === totalRows) {
            setFetch((prevFetch) => {
              return { ...prevFetch, hasMore: false };
            });
          }

          /* 1. If options length not equals to zero then
                a. then set loading false
                b. and then concatenate new options with previous options and return unique array
          */
          if (LENGTH !== 0) {
            setLoading(false);
            setOptions((prevOptions) => {
              const CONCATENATED_ARRAY = prevOptions.concat(data ?? []);

              const UNIQUE_ARRAY = CONCATENATED_ARRAY.filter(
                (item, index, array) =>
                  index === array.findIndex((i) => i.id === item.id),
              );

              return UNIQUE_ARRAY;
            });
          }

          // if Length becomes zero then set loading false
          setLoading(false);
        } else {
          setLoading(false); // if response returns other status then set loading false with the previous array options
        }
      }
    } catch (error) {
      // if request returns cancellation error then return by default
      if (axios.isCancel(error)) return;
      setLoading(false); // set loading false

      const { data } = error as ApiError;
      // log error message and return a toast message
      // console.error("Error:", data.error);
      enqueueSnackbar({
        message: data?.message,
        variant: "error",
      });
    }
  },

  // The debounceInputChange function is used to debounce the input change in the Autocomplete component.
  // It is wrapped with a debounce function to delay the processing of the value and reduce the frequency of API calls.
  debounceInputChange: debounce(
    ({ value, setFetch }: DebounceInputChangeProps) => {
      // Inside the debounced function, the value is processed after a 1000 milliseconds in this case.
      // It sets the fetch state by updating the page and searchKey properties.
      setFetch((fetch) => {
        return { ...fetch, page: 1, searchKey: value };
      });
      // console.log('debounceValue:', value)
    },
    1000,
  ),

  handleInputChange: ({
    value,
    reason,
    setOptions,
    setOpen,
    setFetch,
  }: HandleInputChangeProps) => {
    // If the reason for the change is 'input'
    if (reason === "input") {
      // If the value is empty
      if (value === "") {
        // Clear the options and close the Autocomplete dropdown
        setOptions([]);
        // setOpen(false)
        // Reset the fetch state by setting the page, searchKey, and hasMore properties
        setFetch((fetch) => {
          return { ...fetch, page: 1, searchKey: undefined, hasMore: true };
        });
      } else {
        // If the value is not empty, debounce the input change
        // using the debounceInputChange function from the ASYNCHRONOUS_RHF_AUTOCOMPLETE_UTIL_HELPERS module
        return ASYNCHRONOUS_RHF_AUTOCOMPLETE_UTIL_HELPERS.debounceInputChange({
          value,
          setFetch,
        });
      }
    } else if (reason === "clear") {
      // If the reason for the change is 'clear'
      // If the reason for the change is 'clear'
      setOptions([]);
      setOpen(false);
      // Reset the fetch state by setting the page, searchKey, hasMore, and clear properties
      setFetch((fetch) => {
        return {
          ...fetch,
          page: 1,
          searchKey: undefined,
          hasMore: true,
          clear: true,
        };
      });
    }
  },
};

const INITIAL_FETCH = {
  page: 1,
  limit: 5,
  optionsLength: 0,
  hasMore: true,
};

export const ASYNCHRONOUS_RHF_AUTOCOMPLETE_HOOKS_HELPERS = {
  useOptionsFetch: ({
    apiDetails,
    open,
    dependedFieldDetails,
    defaultValue,
  }: UseOptionFetchProps) => {
    const [initialLoad, setInitialLoad] = React.useState<boolean>(true);
    const [options, setOptions] = React.useState<AutocompleteOptionType[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [fetch, setFetch] = React.useState<FetchStateType>(INITIAL_FETCH);

    // Set default value
    React.useEffect(() => {
      // If the default value exists, set it to options
      if (defaultValue) {
        setOptions([defaultValue]);
      }

      /* If the length of options is equal to one, the default value is none,
         and the initial load is false, then set options to the empty array and specify clear status as true */

      if (options.length === 1 && defaultValue === undefined && !initialLoad) {
        setOptions([]);
        setFetch({ ...INITIAL_FETCH, clear: true });
      }
    }, [defaultValue]);

    // Scroll
    React.useEffect(() => {
      let cancel: any; // Declare variable to axios cancel callback

      /* Call the API for the next bundle of data,
         if the API exist on apiDetails, auto-completion option is opened and the searchKey keyword is not defined. */

      if (apiDetails?.api && open && fetch?.searchKey === undefined) {
        // console.log('scroll')
        ASYNCHRONOUS_RHF_AUTOCOMPLETE_UTIL_HELPERS.apiHandler({
          apiDetails,
          fetch,
          setFetch,
          setLoading,
          setOptions,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
      }
      return () => cancel; // Invoke the cancel function in the cleanup function
    }, [fetch?.page, apiDetails]);

    // searchKey
    React.useEffect(() => {
      let cancel: any; // Declare variable to axios cancel callback

      /* Call the API for searchKeying the keyword,
         if the auto-completion option is opened and the searchKey keyword is defined. */

      if (open && fetch?.searchKey) {
        // console.log('searchKey')
        setOptions([]); // Set options to empty[] before searchKeying for options
        ASYNCHRONOUS_RHF_AUTOCOMPLETE_UTIL_HELPERS.apiHandler({
          apiDetails,
          fetch,
          setFetch,
          setLoading,
          setOptions,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
      } else if (open && fetch?.searchKey === undefined) {
        // console.log('searchKey undefined', fetch)

        ASYNCHRONOUS_RHF_AUTOCOMPLETE_UTIL_HELPERS.apiHandler({
          apiDetails,
          fetch,
          setFetch,
          setLoading,
          setOptions,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
      }
      return () => cancel; // Invoke the cancel function in the cleanup function
    }, [apiDetails, fetch?.searchKey]);

    // Open
    React.useEffect(() => {
      let cancel: any; // Declare variable to axios cancel callback

      /* Call API to fetch initial options, if the auto-completion option is opened and the options has More
         and current options length equal to fetch count and clear status being false. */

      if (
        open &&
        fetch?.hasMore &&
        fetch?.optionsLength !== fetch?.limit &&
        !fetch?.clear
      ) {
        ASYNCHRONOUS_RHF_AUTOCOMPLETE_UTIL_HELPERS.apiHandler({
          apiDetails,
          fetch,
          setFetch,
          setLoading,
          setOptions,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
      }
      return () => cancel; // Invoke the cancel function in the cleanup function
    }, [open, apiDetails]);

    // Clear
    React.useEffect(() => {
      let cancel: any; // Declare variable to axios cancel callback
      if (open && fetch?.clear) {
        // console.log('clear')
        ASYNCHRONOUS_RHF_AUTOCOMPLETE_UTIL_HELPERS.apiHandler({
          apiDetails,
          fetch,
          setFetch,
          setLoading,
          setOptions,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
        // Set 'clear' to undefined after enabling options
        setFetch((prevFetch) => {
          return { ...prevFetch, clear: undefined };
        });
      }
      return () => cancel; // Invoke the cancel function in the cleanup function
    }, [fetch?.clear, apiDetails, open]);

    // Reset
    React.useEffect(() => {
      if (initialLoad) {
        setInitialLoad(false); // Set to initial Load as false after component render once
      } else if (dependedFieldDetails?.id && options.length !== 0) {
        // If the `dependedFieldDetails.id` is not null and `options` array is not empty,
        // it means that the selection of a dependent field has changed, and there are existing options available.
        // In this case, we want to clear the options and reset the fetch state.

        // Clear the options array by setting it to an empty array
        setOptions([]);

        // Reset the fetch state by merging the `INITIAL_FETCH` object and setting `clear` to `true`
        setFetch({ ...INITIAL_FETCH, clear: true });
      }
      if (options.length === 0 && dependedFieldDetails?.id) {
        // If the length of options is equal to 0 then reset the fetch state by merging the `INITIAL_FETCH` object and setting `clear` to `true`
        setFetch({ ...INITIAL_FETCH, clear: true });
      }
    }, [dependedFieldDetails?.id]);

    // Unexpected Closing
    React.useEffect(() => {
      if (!open) {
        // If the auto-completion option is closed, then reset the fetch state by merging the `INITIAL_FETCH` object and setting `clear` to `true`
        setFetch({ ...INITIAL_FETCH, clear: true });
      }
    }, [open]);

    return {
      options,
      loading,
      fetch,
      setFetch,
      setOptions,
    };
  },
};
