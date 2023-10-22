import React from "react";
import { Grid, Button, TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ProjectCardComponent from "../../../components/card/project-card/ProjectCardComponent";
import { useModalContext } from "../../../utils/helpers/context/modal-context/ModalContext";
import ManageProjectForm from "../../../components/form/manage-project/ManageProjectForm";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
import { useProjects } from "./Helper";

// PageProjects component
const PageProjects: React.FC = () => {
  // Access modal context for opening the modal
  const { setModal } = useModalContext();

  // Use the custom hook to manage projects
  const {
    projects,
    handleClear,
    handleChange,
    handleProjectLoading,
    apiConfig,
  } = useProjects();

  return (
    <Grid container gap={2}>
      {/* Section for creating a new project */}
      <Grid item xs={12} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          onClick={() =>
            setModal({
              open: true,
              title: "New Project",
              body: <ManageProjectForm />,
              negativeButton: "Close",
              positiveButton: "Create Project",
            })
          }
        >
          Create Project
        </Button>
        {/* Search input field */}
        <TextField
          id="project-search-field"
          variant="outlined"
          type="search"
          size="small"
          placeholder="Search project here.."
          onChange={handleChange}
          // Change input color to error if there are no projects and there's a search key
          color={
            projects.length === 0 && apiConfig.searchKey ? "error" : undefined
          }
          InputProps={{
            // End adornment for search input
            endAdornment: (
              <>
                {/* Show search icon or clear icon based on search key existence */}
                {apiConfig.searchKey === undefined ? (
                  <SearchIcon fontSize="small" />
                ) : (
                  <IconButton onClick={handleClear}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                )}
              </>
            ),
          }}
        />
      </Grid>
      {/* Section for displaying project cards */}
      <Grid item xs={12}>
        <ProjectCardComponent
          projects={projects}
          handleProjectLoading={handleProjectLoading}
        />
      </Grid>
    </Grid>
  );
};

export default PageProjects;
