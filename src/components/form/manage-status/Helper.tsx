/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { object, string, InferType } from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import projectServices from "../../../services/project-services/ProjectServices";
import { ApiError } from "../../../services/Helper";
import { enqueueSnackbar } from "notistack";
import useSocketHelpers from "../../../socket/Socket";
import {
  CreateStatusRequest,
  GetTaskByIdResponse,
  UpdateStatusRequest,
} from "../../../services/project-services/Helper";
import { useProjectContext } from "../../../utils/helpers/context/project-context/ProjectContext";
import { labelColors } from "../../../utils/helpers/configs/Colors";
import generalFunctions from "../../../utils/helpers/functions/GeneralFunctions";
import { useModal } from "../../common/modal/Helper";

export interface ManageStatusFormProps {
  values?: GetTaskByIdResponse["data"]["status"];
}

// Define the validation schema for the sign-in form
export const manageStatusFormSchema = object({
  name: string().required(),
  color: string().required().default(labelColors.green),
}).required();

// Define the type for the form inputs based on the schema
export type ManageStatusFormInput = InferType<typeof manageStatusFormSchema>;

// Custom hook for handling sign-up logic
export const useManageStatus = ({ values }: ManageStatusFormProps) => {
  const { project, setProject } = useProjectContext();
  const { handleModalClose } = useModal();
  const [activeColor, setActiveColor] = useState<string>(labelColors.green);
  const { pushNotification } = useSocketHelpers();

  // Initialize the React Hook Form with validation resolver and default values
  const {
    handleSubmit,
    control,
    watch,
    setError,
    setValue,
    reset,
    formState: { touchedFields, isSubmitting },
  } = useForm<ManageStatusFormInput>({
    resolver: yupResolver(manageStatusFormSchema),
    defaultValues: {
      name: "",
    },
  });

  // Handle form submission
  const onSubmit: SubmitHandler<ManageStatusFormInput> = async (
    newStatus: ManageStatusFormInput,
  ) => {
    if (project) {
      if (values) {
        const updatedStatus: UpdateStatusRequest = {
          ...newStatus,
          statusId: values.id,
          projectId: project.id,
        };
        touchedFields?.name === undefined && delete updatedStatus.name;

        Object.keys(updatedStatus).length > 1
          ? await updateStatus(updatedStatus)
          : enqueueSnackbar({
              message: "Couldn't find any changes in the field values",
              variant: "info",
            });
      } else {
        await createNewStatus({
          ...newStatus,
          projectId: project.id,
        });
      }
    }
  };

  const createNewStatus = async (props: CreateStatusRequest) => {
    try {
      const response = await projectServices.createStatus(props);

      if (response.data.success && response.status === 201) {
        setProject((prevProject) => {
          if (prevProject) {
            const newStatus = prevProject.statuses.concat(response.data.data);
            return { ...prevProject, statuses: newStatus };
          }
          return null;
        });
        enqueueSnackbar({ message: response.data.message, variant: "success" });
        handleModalClose();
      } else {
        throw { data: { message: response.data.message } };
      }
    } catch (error) {
      const {
        data: { message },
      } = error as ApiError;

      const acknowledgement = generalFunctions.fieldErrorsHandler(
        error as ApiError,
        setError,
      );

      if (!acknowledgement) {
        enqueueSnackbar({ message, variant: "error" });
      }
    }
  };

  const updateStatus = async (newStatus: UpdateStatusRequest) => {
    try {
      const { data, status } = await projectServices.updateStatus(newStatus);
      if (data?.success && status == 200 && values) {
        setProject((prevProject) => {
          if (prevProject) {
            const statusIndex = prevProject.statuses.findIndex(
              (status) => status.id === newStatus.statusId,
            );

            if (statusIndex !== -1) {
              // Assuming your status object has properties like 'color' and 'name'
              const statusToUpdate = prevProject.statuses[statusIndex];
              prevProject.statuses[statusIndex] = {
                ...statusToUpdate,
                color: newStatus?.color ?? statusToUpdate.color,
                name: newStatus?.name ?? statusToUpdate.name,
              };

              return { ...prevProject };
            }
          }
          return null;
        });

        pushNotification({
          broadcastId: newStatus.projectId,
          message: `:author made changes in the Status (Status ${newStatus.statusId}) of the "${project?.name}" project.`,
        });
        enqueueSnackbar({
          message: data?.message,
          variant: "success",
        });
        handleModalClose();
      } else {
        throw { data };
      }
    } catch (error) {
      const {
        data: { message },
      } = error as ApiError;

      const acknowledgement = generalFunctions.fieldErrorsHandler(
        error as ApiError,
        setError,
      );

      if (!acknowledgement) {
        enqueueSnackbar({ message, variant: "error" });
      }
    }
  };

  useEffect(() => {
    if (values) {
      setValue("name", values.name);
      setValue("color", values.color);
      setActiveColor(values.color);
    }
    return () => reset();
  }, [values]);

  useEffect(() => {
    setValue("color", activeColor);
  }, [activeColor]);
  return {
    watch,
    activeColor,
    handleModalClose,
    setActiveColor,
    isSubmitting,
    handleSubmit,
    project,
    control,
    onSubmit,
  };
};
