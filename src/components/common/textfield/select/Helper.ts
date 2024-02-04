/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { SelectFieldApiResponse } from "../../../../services/data-services/Helper";
import { enqueueSnackbar } from "notistack";
import { ApiError } from "../../../../services/Helper";
import { SxProps } from "@mui/system";

export declare type DataApiDetails = {
  // eslint-disable-next-line no-unused-vars
  api: (params: any) => Promise<AxiosResponse<SelectFieldApiResponse>>;
  params?: any;
};
export interface RhfSelectProps<TField extends FieldValues> {
  name: Path<TField>;
  control: Control<TField>;
  label?: string;
  rules?: Record<string, unknown>; // Update the type based on your rules
  size?: "small" | "medium";
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  apidetails: DataApiDetails;
  sx?: SxProps;
  defaultValue?: { id: number; name: string };
}

export const useRhfSelect = ({
  apidetails,
  defaultValue,
}: {
  apidetails: DataApiDetails;
  defaultValue?: { id: number; name: string };
}) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<SelectFieldApiResponse["data"] | []>([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const fetchData = async () => {
    try {
      const params = apidetails?.params ? apidetails.params : undefined;
      const response = await apidetails.api({ ...params });
      if (response.status === 200 && response.data.success) {
        setData(response.data.data);
      } else throw Error("Data fetching id failed");
    } catch (error: any) {
      let message = error?.message;
      const { data } = error as ApiError;

      if (data?.success === false && data?.message) {
        message = data?.message;
      }

      enqueueSnackbar({
        message: message,
        variant: "error",
      });
    }
  };

  useEffect(() => {
    if ((open && data.length === 0) || (defaultValue && data.length === 1)) {
      fetchData();
    }
  }, [open]);

  useEffect(() => {
    if (defaultValue) {
      setData([defaultValue]);
    }
  }, [defaultValue]);

  return {
    data,
    open,
    handleClose,
    handleOpen,
  };
};
