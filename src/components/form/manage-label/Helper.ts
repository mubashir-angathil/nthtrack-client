// Importing necessary dependencies and hooks
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useModal } from "../../common/modal/Helper";
import { useProjectContext } from "../../../utils/helpers/context/project-context/ProjectContext";
import { enqueueSnackbar } from "notistack";
import { ApiError } from "../../../services/Helper";
import projectServices from "../../../services/project-services/ProjectServices";
import {
  CreateLabelRequest,
  UpdateLabelRequest,
} from "../../../services/project-services/Helper";
import { labelColors } from "../../../utils/helpers/configs/Colors";
import generalFunctions from "../../../utils/helpers/functions/GeneralFunctions";
import { LabelAutocompleteOptionType } from "../../../services/data-services/Helper";

// Interface ManageLabelForm
export interface ManageLabelFormInterface {
  values?: LabelAutocompleteOptionType;
  setTableLoading?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}
// Interface for the new label state
interface NewLabelInterface {
  name: string;
  color: string;
}

// Initial state for the new label
const initialLabelState: NewLabelInterface = {
  name: "",
  color: labelColors.green,
};

// Custom hook for managing labels
export const useManageLabel = ({
  values,
  setTableLoading,
}: ManageLabelFormInterface) => {
  // Destructuring values and functions from the custom hooks and state
  const { handleModalClose } = useModal();
  const { project } = useProjectContext();
  const [fieldError, setFieldError] = useState<
    { message: string } | undefined
  >();
  const [newLabel, setNewLabel] =
    useState<NewLabelInterface>(initialLabelState);

  // Function to set field error
  const setError = (_: string, message: { message: string }) => {
    setFieldError(message);
  };

  // Function to reset field error
  const reset = () => {
    setFieldError(undefined);
  };

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newLabel.name.length > 0 && project && !values) {
      await createNewLabel({ ...newLabel, projectId: project.id });
    } else if (values && project) {
      await updateLabel({
        labelId: values.id,
        projectId: project.id,
        color: newLabel.color,
        name: newLabel.name,
      });
    }
  };

  // Function to handle input change
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (fieldError?.message) reset();
    setNewLabel((preValues) => {
      return { ...preValues, [event.target.name]: event.target.value };
    });
  };

  // Function to create a new label
  const createNewLabel = async (props: CreateLabelRequest) => {
    try {
      const response = await projectServices.createLabel(props);
      if (response.data.success && response.status === 201) {
        handleModalClose();
        if (setTableLoading) {
          setTableLoading((prevLoading) => !prevLoading);
        }
        enqueueSnackbar({ message: response.data.message, variant: "success" });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      const {
        data: { message },
      } = error as ApiError;

      // Handling field errors and displaying snackbar for other errors
      const acknowledgement = generalFunctions.fieldErrorsHandler(
        error as ApiError,
        setError as any,
      );

      if (!acknowledgement) {
        enqueueSnackbar({ message, variant: "error" });
      }
    }
  };

  // Function to update a label
  const updateLabel = async (props: UpdateLabelRequest) => {
    try {
      const response = await projectServices.updateLabel(props);
      if (response.data.success && response.status === 200) {
        handleModalClose();
        if (setTableLoading) {
          setTableLoading((prevLoading) => !prevLoading);
        }
        enqueueSnackbar({ message: response.data.message, variant: "success" });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      const {
        data: { message },
      } = error as ApiError;

      // Handling field errors and displaying snackbar for other errors
      const acknowledgement = generalFunctions.fieldErrorsHandler(
        error as ApiError,
        setError as any,
      );

      if (!acknowledgement) {
        enqueueSnackbar({ message, variant: "error" });
      }
    }
  };

  // Effect to clear the current state when unmounting
  useEffect(() => {
    return () => {
      setNewLabel(initialLabelState);
    };
  }, []);

  // Effect to set default values while updating
  useEffect(() => {
    if (values) {
      setNewLabel(values);
    }
  }, [values]);
  // Returning relevant variables and functions
  return {
    handleModalClose,
    handleSubmit,
    handleChange,
    newLabel,
    fieldError,
    setNewLabel,
  };
};
