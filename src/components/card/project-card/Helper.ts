// Importing the ProjectResponse type from the project services helper
import { useNavigate } from "react-router-dom";
import { ProjectsResponse } from "../../../services/project-services/Helper";
import { useEffect, useState } from "react";

// Defining the props interface for ProjectCardComponent
export interface ProjectCardComponentProps {
  projects: ProjectsResponse["data"]; // Array of project data from the API response
  handleProjectLoading: React.UIEventHandler<HTMLDivElement>; // Event handler for scrolling on project container
}
/**
 * useManageProjectCard
 *
 * Custom React hook for managing project cards, providing navigation and handling text overflow.
 *
 * @param {ProjectCardComponentProps["projects"]} projects - Array of project data.
 * @returns {{
 *   more: { [key: string]: boolean },
 *   navigate: function,
 *   handleSetMore: function
 * }} Object with state for text overflow, navigation function, and toggle function for 'more' status.
 */
export const useManageProjectCard = (
  projects: ProjectCardComponentProps["projects"],
) => {
  // React router navigation hook
  const navigate = useNavigate();

  // State to track overflow status for each project
  const [more, setMore] = useState<{ [key: string]: boolean }>({});

  // Function to toggle 'more' status for a specific project
  const handleSetMore = (id: number) => {
    setMore((more) => {
      return { ...more, [id]: !more[id] };
    });
  };

  // Effect to set overflow status based on description length
  useEffect(() => {
    if (projects.length > 0) {
      projects.forEach(
        ({ id, description }: { id: number; description: string }) => {
          let status: boolean | null = null;
          if (description.length > 200 && description.includes(" ")) {
            status = true;
          }
          setMore((more) => ({ ...more, [id]: status }));
        },
      );
    }
  }, [projects]);

  // Return state, navigation function, and toggle function
  return { more, navigate, handleSetMore };
};
