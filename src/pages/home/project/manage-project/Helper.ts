import { useEffect } from "react";
import { Params, useParams } from "react-router-dom";
import { useProjectContextHelpers } from "../../../../utils/helpers/context/project-context/Helper";
import { useProjectContext } from "../../../../utils/helpers/context/project-context/ProjectContext";
import { useGeneralHooks } from "../../../../utils/helpers/hooks/Hooks";

export interface ManageProjectProps {
  type: "create" | "update";
}

export const useUpdateProject = ({ type }: ManageProjectProps) => {
  const params: Params = useParams();
  const { customNavigate } = useGeneralHooks();
  const projectId = params?.projectId ? parseInt(params.projectId) : 0;
  const { project } = useProjectContext();

  // State variables for project and tasks, as well as API configuration
  const { fetchProjectById } = useProjectContextHelpers();

  useEffect(() => {
    if (projectId === 0 && type === "update") return customNavigate("Backward");
    else if (type === "update" && projectId !== 0)
      fetchProjectById({ projectId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return { project };
};
