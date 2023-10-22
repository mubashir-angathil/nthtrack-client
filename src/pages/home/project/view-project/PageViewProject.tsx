import {
  Card,
  Button,
  Grid,
  Typography,
  Box,
  colors,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
import { FC } from "react";
import PluseIcon from "@mui/icons-material/Add";
import { useViewProject } from "./Helper";
import { useModalContext } from "../../../../utils/helpers/context/modal-context/ModalContext";
import ManageIssueForm from "../../../../components/form/manage-issue/ManageIssueForm";
import { useNavigate } from "react-router-dom";
import TaskCardComponent from "../../../../components/card/task-card/TaskCardComponent";

const PageViewProject: FC = () => {
  const { setModal } = useModalContext();
  const {
    tasks,
    apiConfig,
    handleTaskLoading,
    handleChange,
    handleSearchClear,
  } = useViewProject();
  return (
    <Grid container gap={2}>
      <Grid item xs={12} display="flex" justifyContent="space-between" mt={2}>
        <Typography variant="h4">Project name</Typography>
        <Box component="div" display="flex" gap={2}>
          <Button variant="contained" color="error">
            Close Project
          </Button>
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
      <Grid item xs={12}>
        <Typography variant="body1" color="GrayText">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          vel libero ut lacus rutrum viverra. Mauris cursus, dui vitae
          vestibulum feugiat, velit metus ullamcorper ex
        </Typography>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="end" gap={2}>
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
        <TextField
          id="task-search-field"
          variant="outlined"
          type="search"
          size="small"
          placeholder="Search project here.."
          onChange={handleChange}
          // Change input color to error if there are no projects and there's a search key
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
