import {
  Button,
  Grid,
  Typography,
  Box,
  TextField,
  IconButton,
  Skeleton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  Update as UpdateIcon,
} from "@mui/icons-material";
import { FC } from "react";
import { useViewProject } from "./Helper";
import TaskCardComponent from "../../../../components/card/task-card/TaskCardComponent";
import RhfSelectComponent from "../../../../components/common/textfield/select/RhfSelectComponent";
import dataServices from "../../../../services/data-services/DataServices";
import AvatarComponent from "../../../../components/common/avatar/AvatarComponent";

/**
 * Functional component representing the view of a project page.
 * Utilizes the custom hook `useViewProject` for managing state and logic.
 */
const PageViewProject: FC = () => {
  const {
    project,
    tasks,
    control,
    projectMembers,
    apiConfig,
    handleTaskLoading,
    handleCloseProject,
    handleChange,
    handleCreateTask,
    handleSearchClear,
    handleUpdateProject,
  } = useViewProject();
  return (
    <Grid container spacing={2} display="flex">
      {/* Project Details Section */}
      <Grid item xs={12} display="flex" justifyContent="space-between" mt={2}>
        {project.name === "" ? (
          <Skeleton width={200} height={40} />
        ) : (
          <Typography variant="h4" overflow="auto" flexWrap="wrap">
            {project.name}
          </Typography>
        )}

        <Box component="div">
          {/* Close Project Button */}
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={handleCloseProject}
            sx={{ mr: 1, fontSize: 12 }}
          >
            Close Project
          </Button>
          {/* Update Project Button */}
          <Button
            variant="contained"
            color="info"
            size="small"
            endIcon={<UpdateIcon />}
            sx={{ mr: 1, fontSize: 12 }}
            onClick={handleUpdateProject}
          >
            Update Project
          </Button>
          {/* Create Issue Button */}
          <Button
            variant="contained"
            sx={{ fontSize: 12 }}
            size="small"
            onClick={handleCreateTask}
          >
            New Task
          </Button>
        </Box>
      </Grid>

      <Grid item md={projectMembers.length > 0 ? 10 : 12}>
        {/* Project Description Section */}
        <Grid item mb={2} xs={12}>
          <Accordion defaultExpanded>
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Description</Typography>
            </AccordionSummary>
            <AccordionDetails
              dangerouslySetInnerHTML={{
                __html: project.description,
              }}
              sx={{ overflow: "auto" }}
            />
            {/* <AccordionDetails>{project.createdUserBy}</AccordionDetails> */}
          </Accordion>
        </Grid>

        {/* Filters and Search Section */}
        <Grid
          item
          xs={12}
          display="flex"
          alignItems="center"
          justifyContent="end"
          gap={2}
          mb={2}
        >
          {/* Tracker Filter */}
          <RhfSelectComponent
            control={control}
            name="trackerId"
            label="Tracker"
            size="small"
            apidetails={{ api: dataServices.getTrackers }}
          />

          {/* Status Filter */}
          <RhfSelectComponent
            control={control}
            name="statusId"
            label="Status"
            size="small"
            apidetails={{ api: dataServices.getStatus }}
          />

          {/* Search Input */}
          <TextField
            id="task-search-field"
            variant="outlined"
            type="search"
            size="small"
            placeholder="Search project here.."
            onChange={handleChange}
            // Change input color to error if there are no tasks and there's a search key
            color={
              tasks.length === 0 && apiConfig.searchKey ? "error" : undefined
            }
            InputProps={{
              // End adornment for search input
              endAdornment: (
                <>
                  {/* Show search icon or clear icon based on search key existence */}
                  {apiConfig.searchKey === undefined ? (
                    <SearchIcon fontSize="small" />
                  ) : (
                    <IconButton onClick={handleSearchClear}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )}
                </>
              ),
            }}
          />
        </Grid>

        {/* Task Cards Section */}
        <Grid item xs={12}>
          <TaskCardComponent
            tasks={tasks}
            handleTaskLoading={handleTaskLoading}
          />
        </Grid>
      </Grid>
      {projectMembers.length > 0 && (
        <Grid item md={2}>
          <Typography>Peoples</Typography>
          <Divider />
          <Box mt={1} display="flex" flexWrap="wrap">
            {projectMembers.map((profileDetails) => {
              return (
                <AvatarComponent
                  key={profileDetails.id}
                  profile
                  {...profileDetails}
                />
              );
            })}
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default PageViewProject;
