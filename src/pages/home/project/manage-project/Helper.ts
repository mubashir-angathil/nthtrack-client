import { useEffect } from "react";
import { Params, useParams } from "react-router-dom";
import generalFunctions from "../../../../utils/helpers/functions/GeneralFunctions";
import { useProjectContextHelpers } from "../../../../utils/helpers/context/project-context/Helper";
import { useProjectContext } from "../../../../utils/helpers/context/project-context/ProjectContext";

export interface ManageProjectProps {
  type: "create" | "update";
}

export const useUpdateProject = ({ type }: ManageProjectProps) => {
  const params: Params = useParams();
  const projectId = params?.projectId ? parseInt(params.projectId) : 0;
  const { project } = useProjectContext();

  // State variables for project and tasks, as well as API configuration
  const { fetchProjectById } = useProjectContextHelpers();

  useEffect(() => {
    if (projectId === 0 && type === "update") return generalFunctions.goBack();
    else if (type === "update" && projectId !== 0)
      fetchProjectById({ projectId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return { project };
};
