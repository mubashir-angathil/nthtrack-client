/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

// Importing necessary dependencies and types
import { Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  StatusAutocompleteOptionType,
  StatusAutocompleteResponse,
} from "../../../../../services/data-services/Helper";
import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { ApiError } from "../../../../../services/Helper";
import dataServices from "../../../../../services/data-services/DataServices";
import { useProjectContext } from "../../../../../utils/helpers/context/project-context/ProjectContext";
import { useModalContext } from "../../../../../utils/helpers/context/modal-context/ModalContext";
import ManageStatusForm from "../../../../form/manage-status/ManageStatusForm";

// Definition of the props for the RhfStatusAutocomplete component
export interface RhfStatusAutocompleteProps<TField extends FieldValues> {
  label: string;
  name: Path<TField>;
  required?: boolean;
  sx?: SxProps<Theme>;
  placeholder?: string;
  control: Control<TField>;
  size?: "medium" | "small";
  defaultValue?: StatusAutocompleteOptionType;
  variant?: "outlined" | "standard" | "filled";
  fullWidth?: boolean;
  autoFocus?: boolean;
  addNewOption?: boolean;
  onBlur?: (value?: StatusAutocompleteOptionType) => void;
}

// Custom hook for handling status-labeled autocomplete functionality
export const useRhfStatusAutocomplete = (
  defaultValue?: StatusAutocompleteOptionType,
) => {
  // State and context variables
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { project } = useProjectContext();
  const { setModal } = useModalContext();
  const [statuses, setStatuses] = useState<StatusAutocompleteResponse["data"]>(
    [],
  );

  // Function to fetch statuses associated with a project
  const fetchStatuses = async (projectId: number) => {
    try {
      setLoading(false);
      const response = await dataServices.getStatuses({ projectId });
      if (response.status === 200 && response.data.success)
        setStatuses(response.data.data);
    } catch (error) {
      const {
        data: { message },
      } = error as ApiError;
      enqueueSnackbar({ message, variant: "error" });
    }
  };

  // Function to handle adding a new status option
  const handleAddNewOption = () => {
    setModal({
      open: true,
      form: {
        title: "Add New Status",
        body: <ManageStatusForm />,
      },
    });
  };

  // Effect to fetch statuses when the autocomplete is open and a project is selected
  React.useEffect(() => {
    if (open && project) {
      fetchStatuses(project.id);
    }
  }, [open]);

  // Effect to set default statuses when a default value is provided
  React.useEffect(() => {
    if (defaultValue) {
      setStatuses([defaultValue]);
    }
  }, [defaultValue]);

  // Returning relevant variables and functions
  return { open, statuses, loading, setOpen, setLoading, handleAddNewOption };
};
