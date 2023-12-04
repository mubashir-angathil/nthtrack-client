import { useForm } from "react-hook-form";
import { object, number, InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDialog } from "../../common/dialog/Helper";
import { SubmitHandler } from "react-hook-form";
import projectServices from "../../../services/project-services/ProjectServices";
import { AddNewMemberRequest } from "../../../services/project-services/Helper";
import { Location, useLocation } from "react-router-dom";
import { AxiosResponse } from "axios";
import { ApiError } from "../../../services/Helper";
import { enqueueSnackbar } from "notistack";
import { Dispatch, SetStateAction } from "react";

// Define the validation schema for the ProjectMember
export const manageProjectMemberSchema = object({
  userId: number().required(),
  permissionId: number().required(),
});

// Define the type for the form inputs based on the schema
export type ManageProjectMemberInput = InferType<
  typeof manageProjectMemberSchema
>;

export const useManageProjectMember = (
  refresh: Dispatch<SetStateAction<boolean | undefined>>,
) => {
  const location: Location = useLocation();
  const { control, handleSubmit } = useForm<ManageProjectMemberInput>({
    resolver: yupResolver(manageProjectMemberSchema),
  });

  const { handleDialogClose } = useDialog();

  // Handle form submission
  const onSubmit: SubmitHandler<ManageProjectMemberInput> = async (data) => {
    if (location.state?.projectId) {
      const member = { ...data, projectId: location.state.projectId };
      await addNewMember(member);
    }
  };

  // Add new member to project
  const addNewMember = async (props: AddNewMemberRequest) => {
    try {
      const response: AxiosResponse<any> =
        await projectServices.addNewMember(props);
      const {
        data: { message, success },
      } = response;
      if (success && response.status === 201) {
        enqueueSnackbar({ message, variant: "success" });
        refresh(true);
        handleDialogClose();
      }
    } catch (error) {
      const {
        data: { message },
      } = error as ApiError;

      enqueueSnackbar({ message, variant: "error" });
    }
  };

  return { control, handleDialogClose, onSubmit, handleSubmit };
};
