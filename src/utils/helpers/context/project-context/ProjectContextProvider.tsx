import { useEffect, useState } from "react";
import { ProjectContext } from "./ProjectContext";
import { GetProjectByIdResponse } from "../../../../services/project-services/Helper";
import sessionServices from "../../../../services/storage-services/SessionServices";

// Component to provide project context
export const ProjectContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // State to hold the project data
  const [project, setProject] = useState<GetProjectByIdResponse["data"] | null>(
    null,
  );

  // useEffect to handle project state changes and sessionStorage
  useEffect(() => {
    // If project is not null, store it in sessionStorage
    if (project !== null) {
      sessionServices.setProjectDetails(project);
    }

    // If project is null, retrieve it from sessionStorage
    if (project === null) {
      const currentProject = sessionServices.getProjectDetails();
      if (currentProject) {
        setProject(currentProject);
      }
    }
  }, [project]);

  // Provide the project context to the children
  return (
    <ProjectContext.Provider value={{ project, setProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
