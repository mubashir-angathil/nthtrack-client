import { useState } from "react";
import { object, string, InferType } from "yup";
import { useForm, SubmitHandler, Control } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDialog } from "../../common/dialog/Helper";

export interface ManageProjectFormProps {
  control: Control<ManageProjectFormInput>;
}
// Define the validation schema for the sign-in form
export const manageProjectFormSchema = object({
  projectName: string().required(),
  description: string().min(5).required(),
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
  const onSubmit: SubmitHandler<ManageProjectFormInput> = async () => {
    setIsSubmit(true);
    setTimeout(() => setIsSubmit(false), 2000);
    // console.log(data);
  };

  return {
    isSubmit,
    handleSubmit,
    handleDialogClose,
    control,
    setError,
    onSubmit,
  };
};
