import { useEffect, useState } from "react";
import { object, string, InferType, number, array } from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import projectServices from "../../../services/project-services/ProjectServices";
import { ApiError } from "../../../services/Helper";
import generalFunctions from "../../../utils/helpers/functions/GeneralFunctions";
import { enqueueSnackbar } from "notistack";
import {
  GetTaskByIdResponse,
  ManageTaskRequest,
  Project,
  TaskResponse,
  UpdateTaskRequest,
} from "../../../services/project-services/Helper";
import { ApiDetailsType } from "../../common/textfield/autocomplete/multi-autocomplete/Helper";
import dataServices from "../../../services/data-services/DataServices";
import useSocketHelpers from "../../../socket/Socket";
import { useDialog } from "../../common/dialog/Helper";
import { useProjectContext } from "../../../utils/helpers/context/project-context/ProjectContext";

export interface ManageTaskFormProps {
  values?: GetTaskByIdResponse["data"];
  activeStatus?: Project["statuses"][0] | null;
  setTasks?: React.Dispatch<React.SetStateAction<TaskResponse["data"]>>;
  setRefresh?: React.Dispatch<React.SetStateAction<boolean>>;
}
// Define the validation schema for the sign-in form
export const manageTaskFormSchema = object({
  labelId: number().required(),
  task: string().required(),
  description: string().min(2).max(500),
  assignees: array().required().default([]),
}).required();

// Define the type for the form inputs based on the schema
export type ManageTaskFormInput = InferType<typeof manageTaskFormSchema>;

// Custom hook for handling sign-up logic
export const useManageTask = ({
  values,
  activeStatus,
  setTasks,
  setRefresh,
}: ManageTaskFormProps) => {
  const { project } = useProjectContext();
  const { handleDialogClose } = useDialog();
  const [assigneesApiDetails, setAssigneesApiDetails] =
    useState<ApiDetailsType>({});

  const { pushNotification } = useSocketHelpers();
  // Initialize the React Hook Form with validation resolver and default values
  const {
    handleSubmit,
    control,
    setError,
    setValue,
    reset,
    formState: { touchedFields, isSubmitting },
  } = useForm<ManageTaskFormInput>({
    resolver: yupResolver(manageTaskFormSchema),
    defaultValues: {
      task: "",
    },
  });

  // Handle form submission
  const onSubmit: SubmitHandler<ManageTaskFormInput> = async (
    newTask: ManageTaskFormInput,
  ) => {
    const assigneesId = newTask.assignees.map((value) => value.id);
    if (project && !values && activeStatus) {
      newTask.assignees = assigneesId;
      await createNewTask({
        ...newTask,
        statusId: activeStatus.id,
        projectId: project.id,
      });
    } else if (values && project) {
      if (touchedFields.assignees) newTask.assignees = assigneesId;
      const updatedTask: UpdateTaskRequest = {
        ...newTask,
        taskId: values.id,
        projectId: project.id,
      };
      touchedFields?.description === undefined &&
        delete updatedTask.description;
      touchedFields?.labelId === undefined && delete updatedTask.labelId;
      touchedFields?.task === undefined && delete updatedTask.task;
      touchedFields?.assignees === undefined && delete updatedTask.assignees;

      Object.keys(updatedTask).length > 1
        ? await updateTask(updatedTask, project.id)
        : enqueueSnackbar({
            message: "Couldn't find any changes in the field values",
            variant: "info",
          });
    } else {
      enqueueSnackbar({
        message: "Project id is missing, go back and try agin!",
        variant: "error",
      });
    }
  };

  const createNewTask = async (newTask: ManageTaskRequest) => {
    try {
      const { data, status } = await projectServices.createTask(newTask);

      if (data?.success && status === 201 && setTasks) {
        if (newTask.assignees.length > 0 && data.data.id) {
          newTask.assignees.forEach((assigneeId) => {
            pushNotification({
              broadcastId: assigneeId,
              message: `:author assigned you the task (Task ${data.data.id}) of the "${project?.name}" project. `,
            });
          });
        }
        setTasks((prevTasks) => {
          if (activeStatus) {
            return {
              ...prevTasks,
              [activeStatus?.name]: [
                ...(prevTasks[activeStatus?.name] || []),
                data.data,
              ],
            };
          }
          return prevTasks;
        });

        enqueueSnackbar({
          message: data.message,
          variant: "success",
        });
        handleDialogClose();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      // Handle errors from the sign-ip API
      const {
        data: { message },
      } = error as ApiError;

      message.split(",").map((value) => {
        enqueueSnackbar({
          message: value,
          variant: "error",
        });
      });
    }
  };

  const updateTask = async (newTask: UpdateTaskRequest, projectId: number) => {
    try {
      const { data, status } = await projectServices.updateTask({
        ...newTask,
        projectId,
      });
      if (data?.success && status === 200) {
        pushNotification({
          broadcastId: projectId,
          message: `:author made changes in the task (Task ${newTask.taskId}) of the "${project?.name}" project.`,
        });
        enqueueSnackbar({
          message: data?.message,
          variant: "success",
        });
        setRefresh && setRefresh((prevValue) => !prevValue);
        handleDialogClose();
      }
    } catch (error) {
      // Handle errors from the sign-ip API
      const {
        data: { message },
      } = error as ApiError;

      generalFunctions.fieldErrorsHandler(error as ApiError, setError);
      message.split(",").map((value) => {
        enqueueSnackbar({
          message: value,
          variant: "error",
        });
      });
    }
  };

  useEffect(() => {
    if (values) {
      setValue("labelId", values.label.id);
      setValue("task", values.task);
      setValue("description", values.description);
    }
    return () => reset();
  }, [setValue, values, reset]);

  useEffect(() => {
    if (project) {
      setAssigneesApiDetails({
        api: () =>
          dataServices.getProjectMembers({ projectId: project.id }) as any,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isSubmitting,
    handleSubmit,
    setValue,
    handleDialogClose,
    assigneesApiDetails,
    control,
    onSubmit,
  };
};
