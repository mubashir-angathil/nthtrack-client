import {
  Button,
  Grid,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Skeleton,
} from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
import { FC } from "react";
import PluseIcon from "@mui/icons-material/Add";
import { useViewProject } from "./Helper";
import { useModalContext } from "../../../../utils/helpers/context/modal-context/ModalContext";
import ManageIssueForm from "../../../../components/form/manage-issue/ManageIssueForm";
import TaskCardComponent from "../../../../components/card/task-card/TaskCardComponent";

/**
 * Functional component representing the view of a project page.
 * Utilizes the custom hook `useViewProject` for managing state and logic.
 */
const PageViewProject: FC = () => {
  // Extract necessary functions and state variables from the custom hook
  const { setModal } = useModalContext();
  const {
    project,
    tasks,
    apiConfig,
    fetchCloseProjectById,
    handleTaskLoading,
    handleChange,
    handleSearchClear,
  } = useViewProject();

  return (
    <Grid container gap={2}>
      {/* Project Details Section */}
      <Grid item xs={12} display="flex" justifyContent="space-between" mt={2}>
        {project.projectName === "" ? (
          <Skeleton width={200} height={40} />
        ) : (
          <Typography variant="h4">{project.projectName}</Typography>
        )}

        <Box component="div" display="flex" flexGrow={0} gap={2}>
          {/* Close Project Button */}
          <Button
            variant="contained"
            color="error"
            onClick={async () => await fetchCloseProjectById()}
          >
            Close Project
          </Button>
          {/* Create Issue Button */}
          <Button
            variant="contained"
            startIcon={<PluseIcon />}
            onClick={() => {
              setModal({
                open: true,
                body: <ManageIssueForm />,
                positiveButton: "Create issue",
                negativeButton: "close",
                title: "Create Issue",
              });
            }}
          >
            Create Issue
          </Button>
        </Box>
      </Grid>

      {/* Project Description Section */}
      <Grid item xs={12}>
        {project.description === "" ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <Typography variant="body1" color="GrayText">
            {project.description}
          </Typography>
        )}
      </Grid>

      {/* Filters and Search Section */}
      <Grid item xs={12} display="flex" justifyContent="end" gap={2}>
        {/* Tracker Filter */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="demo-simple-select-disabled">Tracker</InputLabel>
          <Select
            labelId="demo-simple-select-disabled-label"
            id="demo-simple-select-disabled"
            value={0}
            label="Age"
            size="small"
            onChange={() => {}}
          >
            <MenuItem value={0}>
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        {/* Status Filter */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="demo-simple-select-disabled">Status</InputLabel>
          <Select
            labelId="demo-simple-select-disabled-label"
            id="demo-simple-select-disabled"
            value={0}
            label="Age"
            size="small"
            onChange={() => {}}
          >
            <MenuItem value={0}>
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Opened"}>Opened</MenuItem>
            <MenuItem value={"Closed"}>Closed</MenuItem>
          </Select>
        </FormControl>

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
  );
};

export default PageViewProject;
