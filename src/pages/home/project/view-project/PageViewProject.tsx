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
} from "@mui/material";
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  Update as UpdateIcon,
} from "@mui/icons-material";
import { FC } from "react";
import PluseIcon from "@mui/icons-material/Add";
import { useViewProject } from "./Helper";
import TaskCardComponent from "../../../../components/card/task-card/TaskCardComponent";
import RhfSelectComponent from "../../../../components/common/textfield/select/RhfSelectComponent";
import dataServices from "../../../../services/data-services/DataServices";

/**
 * Functional component representing the view of a project page.
 * Utilizes the custom hook `useViewProject` for managing state and logic.
 */
const PageViewProject: FC = () => {
  const {
    project,
    tasks,
    control,
    dialog,
    apiConfig,
    handleTaskLoading,
    handleCloseProject,
    handleChange,
    setDialog,
    handleSearchClear,
    handleUpdateProject,
  } = useViewProject();

  return (
    <Grid container gap={2}>
      {/* Project Details Section */}
      <Grid item xs={12} display="flex" justifyContent="space-between" mt={2}>
        {project.projectName === "" ? (
          <Skeleton width={200} height={40} />
        ) : (
          <Typography variant="h4" overflow="auto" flexWrap="wrap">
            {project.projectName}
          </Typography>
        )}

        <Box component="div" display="flex" flexGrow={0} gap={2}>
          {/* Close Project Button */}
          <Button
            variant="contained"
            color="error"
            onClick={handleCloseProject}
          >
            Close Project
          </Button>
          {/* Update Project Button */}
          <Button
            variant="contained"
            color="info"
            endIcon={<UpdateIcon />}
            onClick={handleUpdateProject}
          >
            Update Project
          </Button>
          {/* Create Issue Button */}
          <Button
            variant="contained"
            startIcon={<PluseIcon />}
            onClick={() => {
              setDialog(dialog);
            }}
          >
            Create Issue
          </Button>
        </Box>
      </Grid>

      {/* Project Description Section */}
      <Grid item xs={12}>
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
      >
        {/* Tracker Filter */}
        <RhfSelectComponent
          control={control}
          name="trackerId"
          label="Tracker"
          apidetails={{ api: dataServices.getTrackers }}
        />

        {/* Status Filter */}
        <RhfSelectComponent
          control={control}
          name="statusId"
          label="Status"
          apidetails={{ api: dataServices.getStatus }}
        />

        {/* Search Input */}
        <TextField
          id="task-search-field"
          variant="outlined"
          type="search"
          size="medium"
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
  );
};

export default PageViewProject;
