/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

// Importing necessary dependencies and types
import { Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  LabelAutocompleteOptionType,
  LabelAutocompleteResponse,
} from "../../../../../services/data-services/Helper";
import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { ApiError } from "../../../../../services/Helper";
import dataServices from "../../../../../services/data-services/DataServices";
import { useProjectContext } from "../../../../../utils/helpers/context/project-context/ProjectContext";
import { useModalContext } from "../../../../../utils/helpers/context/modal-context/ModalContext";
import ManageLabelForm from "../../../../form/manage-label/ManageLabelForm";

// Definition of the props for the RhfLabelAutocomplete component
export interface RhfLabelAutocompleteProps<TField extends FieldValues> {
  label: string;
  name: Path<TField>;
  required?: boolean;
  sx?: SxProps<Theme>;
  placeholder?: string;
  control: Control<TField>;
  size?: "medium" | "small";
  defaultValue?: LabelAutocompleteOptionType;
  variant?: "outlined" | "standard" | "filled";
  fullWidth?: boolean;
  autoFocus?: boolean;
  addNewOption?: boolean;
  onBlur?: (value?: LabelAutocompleteOptionType) => void;
}

// Custom hook for handling labeled autocomplete functionality
export const useRhfLabelAutocomplete = (
  defaultValue?: LabelAutocompleteOptionType,
) => {
  // State and context variables
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { project } = useProjectContext();
  const { setModal } = useModalContext();
  const [labels, setLabels] = useState<LabelAutocompleteResponse["data"]>([]);

  // Function to fetch labels associated with a project
  const fetchLabels = async (projectId: number) => {
    try {
      setLoading(false);
      const response = await dataServices.getLabels({ projectId });
      if (response.status === 200 && response.data.success)
        setLabels(response.data.data);
    } catch (error) {
      const {
        data: { message },
      } = error as ApiError;
      enqueueSnackbar({ message, variant: "error" });
    }
  };

  // Function to handle adding a new label option
  const handleAddNewOption = () => {
    setModal({
      open: true,
      form: {
        title: "Add New Label",
        body: <ManageLabelForm />,
      },
    });
  };

  // Effect to fetch labels when the autocomplete is open and a project is selected
  React.useEffect(() => {
    if (open && project) {
      fetchLabels(project.id);
    }
  }, [open]);

  // Effect to set default labels when a default value is provided
  React.useEffect(() => {
    if (defaultValue) {
      setLabels([defaultValue]);
    }
  }, [defaultValue]);

  // Returning relevant variables and functions
  return { open, labels, loading, setOpen, setLoading, handleAddNewOption };
};
