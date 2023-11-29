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
  GroupAdd,
} from "@mui/icons-material";
import { FC } from "react";
import { useViewProject } from "./Helper";
import TaskCardComponent from "../../../../components/card/task-card/TaskCardComponent";
import RhfSelectComponent from "../../../../components/common/textfield/select/RhfSelectComponent";
import dataServices from "../../../../services/data-services/DataServices";
import AvatarComponent from "../../../../components/common/avatar/AvatarComponent";
import routes from "../../../../utils/helpers/routes/Routes";

/**
 * Functional component representing the view of a project page.
 * Utilizes the custom hook `useViewProject` for managing state and logic.
 */
const PageViewProject: FC = () => {
  const {
    project,
    tasks,
    control,
    navigate,
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
          <Typography variant="h5" overflow="auto" flexWrap="wrap">
            {project.name}
          </Typography>
        )}

        <Button
          variant="contained"
          sx={{ fontSize: 12 }}
          size="small"
          onClick={() => navigate(routes.projectMembers.path)}
          startIcon={<GroupAdd fontSize="small" />}
        >
          Members
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Divider />
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
        <Grid item xs={12} display="flex" justifyContent="end">
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
        </Grid>
        {/* Filters and Search Section */}
        <Grid
          item
          xs={12}
          mt={2}
          mb={2}
          gap={1}
          display="flex"
          alignItems="center"
          // justifyContent="end"
        >
          {/* Search Input */}
          <TextField
            id="task-search-field"
            variant="outlined"
            type="search"
            size="small"
            fullWidth
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

          <Button
            variant="contained"
            sx={{ fontSize: 12, minWidth: 100 }}
            size="small"
            onClick={handleCreateTask}
          >
            New Task
          </Button>
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
          <Typography variant="subtitle1">Contributors</Typography>
          <Box mt={1} flexWrap="wrap">
            {projectMembers.map((profileDetails, index) => {
              return (
                <Box
                  key={profileDetails.id}
                  display="flex"
                  alignItems="center"
                  gap={1}
                  pt={index > 0 ? 1 : 0}
                >
                  <AvatarComponent
                    profile
                    width={28}
                    height={28}
                    {...profileDetails}
                  />
                  <Typography variant="subtitle2">
                    {profileDetails.username}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default PageViewProject;
