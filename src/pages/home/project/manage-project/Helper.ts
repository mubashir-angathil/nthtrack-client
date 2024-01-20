import { useState, useEffect } from "react";
import { Params, useParams } from "react-router-dom";
import { GetProjectByIdResponse } from "../../../../services/project-services/Helper";
import generalFunctions from "../../../../utils/helpers/functions/GeneralFunctions";
import { useProjectContextHelpers } from "../../../../utils/helpers/context/project-context/Helper";

export interface ManageProjectProps {
  type: "create" | "update";
}

export const useUpdateProject = ({ type }: ManageProjectProps) => {
  const params: Params = useParams();
  const [projectId] = useState<number>(
    params?.projectId ? parseInt(params.projectId) : 0,
  );
  // State variables for project and tasks, as well as API configuration
  const [project] = useState<GetProjectByIdResponse["data"]>();
  const { fetchProjectById } = useProjectContextHelpers();

  useEffect(() => {
    if (projectId === 0 && type === "update") return generalFunctions.goBack();
    else if (type === "update" && projectId !== 0)
      fetchProjectById({ projectId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return { project };
};
