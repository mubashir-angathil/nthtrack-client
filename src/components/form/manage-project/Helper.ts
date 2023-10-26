import { useState } from "react";
import { object, string, InferType } from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDialog } from "../../common/dialog/Helper";
import projectServices from "../../../services/project-services/ProjectServices";
import { ApiError } from "../../../services/Helper";
import generalFunctions from "../../../utils/helpers/functions/GeneralFunctions";
import { enqueueSnackbar } from "notistack";

export interface ManageProjectFormProps {
  updateProjects: () => Promise<void>;
}
// Define the validation schema for the sign-in form
export const manageProjectFormSchema = object({
  projectName: string().min(2).max(52).required(),
  description: string().min(2).max(1002).required(),
}).required();

// Define the type for the form inputs based on the schema
export type ManageProjectFormInput = InferType<typeof manageProjectFormSchema>;

// Custom hook for handling sign-up logic
export const useManageProject = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { handleDialogClose } = useDialog();
  // Initialize the React Hook Form with validation resolver and default values
  const { handleSubmit, control, setError } = useForm<ManageProjectFormInput>({
    resolver: yupResolver(manageProjectFormSchema),
    defaultValues: {
      description: "",
      projectName: "",
    },
  });

  // Handle form submission
  const onSubmit: SubmitHandler<ManageProjectFormInput> = async (
    newProject: ManageProjectFormInput,
  ) => {
    setIsSubmit(true);
    await createNewProject(newProject);
    // console.log(data);
  };

  const createNewProject = async (newProject: ManageProjectFormInput) => {
    try {
      const { data, status } = await projectServices.createProject(newProject);
      setIsSubmit(false);
      if (data?.success && status === 200) {
        handleDialogClose();
        enqueueSnackbar({
          message: data?.message,
          variant: "success",
        });
      }
    } catch (error) {
      setIsSubmit(false);
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

  return {
    isSubmit,
    handleSubmit,
    handleDialogClose,
    control,
    onSubmit,
  };
};
