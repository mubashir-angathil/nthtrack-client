import React, { Suspense } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useProjects } from "./Helper";
import { Add, Clear, Search } from "@mui/icons-material";
import ProjectCardComponent from "../../../components/card/project-card/ProjectCardComponent";

// PageProjects component
const PageProjects: React.FC = () => {
  // Use the custom hook to manage projects
  const {
    projects,
    handleClear,
    handleChange,
    handleCreateProject,
    handleProjectLoading,
    apiConfig,
  } = useProjects();

  // Media query
  const matches = useMediaQuery("(min-width:600px)");

  // Search component
  const SearchComponent = () => (
    <TextField
      fullWidth={!matches}
      id="project-search-field"
      variant="outlined"
      type="search"
      size="small"
      placeholder="Search project here.."
      onChange={handleChange}
      // Change input color to error if there are no projects and there's a search key
      color={projects.length === 0 && apiConfig.searchKey ? "error" : undefined}
      InputProps={{
        // End adornment for search input
        endAdornment: (
          <>
            {/* Show search icon or clear icon based on search key existence */}
            {apiConfig.searchKey === undefined ? (
              <Search fontSize="small" />
            ) : (
              <IconButton onClick={handleClear}>
                <Clear fontSize="small" />
              </IconButton>
            )}
          </>
        ),
      }}
    />
  );

  // Create new project component
  const CreateNewProjectButton = () => (
    <Button
      variant="contained"
      endIcon={<Add />}
      onClick={handleCreateProject}
      size="small"
    >
      {matches ? "New Project" : "New"}
    </Button>
  );

  return (
    <Grid container spacing={1}>
      <Grid
        item
        xs={12}
        gap={1}
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
      >
        <Typography variant="h5" fontWeight={700}>
          Projects
        </Typography>
        {!matches && <CreateNewProjectButton />}
        <Box
          gap={1}
          display="flex"
          justifyContent="end"
          width={!matches ? "100%" : "auto"}
        >
          <SearchComponent />
          {matches && <CreateNewProjectButton />}
        </Box>
      </Grid>
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
