// Importing necessary dependencies and hooks
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDialog } from "../../common/dialog/Helper";
import { enqueueSnackbar } from "notistack";
import { ApiError } from "../../../services/Helper";
import projectServices from "../../../services/project-services/ProjectServices";
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";
import routes from "../../../utils/helpers/routes/Routes";

// Custom hook for handling project deletion
export const useDeleteProject = () => {
  // State and hook variables
  const [isMatchProjectName, setIsMatchProjectName] = useState<boolean>(false);
  const { handleDialogClose } = useDialog();
  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const project = location.state?.project;

  // Function to handle input change and check if the project name matches
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.value === project?.name) {
      setIsMatchProjectName(true);
    } else {
      setIsMatchProjectName(false);
    }
  };

  // Function to delete projects
  const deleteProjects = async ({ projectId }: { projectId: number }) => {
    try {
      const response = await projectServices.deleteProject({ projectId });
      if (response.data?.success) {
        handleDialogClose();
        enqueueSnackbar({ message: response.data.message, variant: "success" });
        navigate(routes.home.path, { replace: true });
      }
    } catch (error) {
      const {
        data: { message },
      } = error as ApiError;
      enqueueSnackbar({ message });
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (project?.id) {
      await deleteProjects({ projectId: project.id });
    }
  };

  // Effect to close the dialog if the project is undefined
  useEffect(() => {
    if (project === undefined) {
      handleDialogClose();
    }
  }, [handleDialogClose, project]);

  // Returning relevant variables and functions
  return {
    project,
    isMatchProjectName,
    handleSubmit,
    handleChange,
    handleDialogClose,
  };
};
