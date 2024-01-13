import React, { Suspense } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
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

  return (
    <Grid container spacing={1}>
      <Grid
        xs={12}
        item
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={1}
      >
        <Typography variant="h5" fontWeight={700}>
          Projects
        </Typography>
        <Box display="flex" gap={1}>
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
          <Button
            variant="contained"
            endIcon={<Add />}
            onClick={handleCreateProject}
            sx={{ flexShrink: 0 }}
            size="small"
          >
            Create Project
          </Button>
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
