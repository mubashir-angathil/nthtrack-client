import React, { Suspense } from "react";
import { Grid, Button, TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ProjectCardComponent from "../../../components/card/project-card/ProjectCardComponent";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
import { useProjects } from "./Helper";

// PageProjects component
const PageProjects: React.FC = () => {
  // Use the custom hook to manage projects
  const {
    dialog,
    setDialog,
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
          onClick={() => setDialog(dialog)}
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
        <Suspense fallback={<h2>loading....</h2>}>
          <ProjectCardComponent
            projects={projects}
            handleProjectLoading={handleProjectLoading}
          />
        </Suspense>
      </Grid>
    </Grid>
  );
};

export default PageProjects;
