// TaskCardComponent: A functional component representing the task management view with status columns.

import React from "react";
import {
  Box,
  Grid,
  Card,
  IconButton,
  Typography,
  TextField,
  Button,
  Menu,
  MenuItem,
  colors,
  Badge,
  AvatarGroup,
  Chip,
} from "@mui/material";
import { useTaskComponent } from "./Helper";
import AvatarComponent from "../../common/avatar/AvatarComponent";
import routes from "../../../utils/helpers/routes/Routes";
import { Add, Clear, MoreHoriz, MoreVert, Search } from "@mui/icons-material";
import { StatusInterface } from "../../../services/project-services/Helper";
import RhfLabelAutocomplete from "../../common/textfield/autocomplete/label-autocomplete/RhfLabelAutocomplete";

// Functional component for rendering the Task Card
const TaskCardComponent: React.FC = () => {
  // Extracted values and functions from the custom hook
  const {
    project,
    control,
    tasks,
    anchorElStatusMenu,
    handleOpenStatusMenu,
    handleCloseStatusMenu,
    anchorElTaskMenu,
    handleChange,
    search,
    handleCloseTaskMenu,
    handleDeleteTask,
    handleOpenTaskMenu,
    handleAddNewStatus,
    handleSearchClear,
    navigate,
    handleCreateTask,
  } = useTaskComponent();

  return (
    <Grid container spacing={2}>
      {/* Search and Label Filter Section */}
      <Grid
        item
        xs={12}
        component="form"
        display="flex"
        alignItems="center"
        gap={2}
        mt={2}
      >
        {/* Search Input Field */}
        <TextField
          id="task-search-field"
          variant="outlined"
          type="search"
          size="small"
          fullWidth
          placeholder="Search task here.."
          onChange={handleChange}
          // Change input color to error if there are no tasks and there's a search key
          color={search ? "error" : undefined}
          InputProps={{
            // End adornment for search input
            endAdornment: (
              <>
                {/* Show search icon or clear icon based on search key existence */}
                {search === undefined ? (
                  <Search fontSize="small" />
                ) : (
                  <IconButton onClick={handleSearchClear}>
                    <Clear fontSize="small" />
                  </IconButton>
                )}
              </>
            ),
          }}
        />
        {/* Tracker Filter */}
        <RhfLabelAutocomplete
          control={control}
          name="labelId"
          label="Label"
          size="small"
          fullWidth
          addNewOption={false}
        />
      </Grid>

      {/* Task Status Columns Section */}
      <Grid
        item
        xs={12}
        display="flex"
        gap={2}
        mb={4}
        sx={{ overflowX: "auto", "::-webkit-scrollbar": { display: "none" } }}
      >
        {/* Map through each status and render the corresponding column */}
        {project?.statuses?.map((status: StatusInterface) => {
          return (
            <Box
              key={status.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                border: 0,
                minWidth: 300,
                gap: 2,
                borderRadius: 2,
                p: 1,
                background: colors.grey[900],
              }}
            >
              {/* Header section for each status column */}
              <Box
                gap={2}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  background: "black",
                  border: "1px solid white",
                  p: 1,
                  borderRadius: 2,
                }}
              >
                {/* Status Title, Color Indicator, and Task Count Badge */}
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    component="span"
                    sx={{
                      border: 2,
                      borderColor: `rgb(${status.color})`,
                      borderRadius: 2,
                      width: 20,
                      height: 20,
                    }}
                  />
                  <Typography variant="subtitle1">{status.name}</Typography>
                  <Badge
                    badgeContent={tasks[status.name]?.length}
                    color="success"
                  />
                </Box>
                {/* Menu button for status actions */}
                <IconButton onClick={(e) => handleOpenStatusMenu(e, status)}>
                  <MoreHoriz />
                </IconButton>
              </Box>

              {/* Task Cards within each status column */}
              <Box
                sx={{
                  height: "55dvh",
                  overflow: "auto",
                  p: 1,
                }}
                component="div"
              >
                {tasks[status.name]?.map((task) => {
                  return (
                    <Card
                      key={task.id}
                      sx={{
                        width: "100%",
                        p: 2,
                        mb: 1,
                      }}
                      elevation={0}
                      component="div"
                      draggable
                    >
                      {/* Task Details Section */}
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box display="flex" gap={1}>
                          <Typography>#{task.id}</Typography>
                          <Chip
                            label={task.label.name}
                            size="small"
                            sx={{
                              background: `rgba(${task?.label.color},0.3)`,
                              border: 1,
                              borderColor: `rgb(${task?.label.color})`,
                            }}
                          />
                        </Box>
                        <IconButton
                          size="small"
                          onClick={(e) =>
                            handleOpenTaskMenu(e, task.id, status)
                          }
                        >
                          <MoreVert fontSize="small" />
                        </IconButton>
                      </Box>
                      <Typography
                        sx={{
                          lineHeight: 1.5,
                          width: "90%",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          cursor: "pointer",
                          ":hover": {
                            color: "Highlight",
                          },
                        }}
                        onClick={() =>
                          navigate(routes.tasks.path.concat(task.id.toString()))
                        }
                        title={task.task}
                      >
                        {task.task}
                      </Typography>
                      <Typography variant="caption" color="gray">
                        Author @{task.createdByUser?.username}
                      </Typography>
                      <AvatarGroup
                        max={7}
                        total={task.assignees.length}
                        componentsProps={{
                          additionalAvatar: {
                            sx: {
                              width: 24,
                              height: 24,
                              fontSize: 15,
                              background: "red",
                            },
                          },
                        }}
                      >
                        {task.assignees.map((profile) => {
                          return (
                            <AvatarComponent
                              profile={true}
                              key={profile.id}
                              {...profile}
                            />
                          );
                        })}
                      </AvatarGroup>
                    </Card>
                  );
                })}
              </Box>
              <Button
                variant="outlined"
                onClick={() => handleCreateTask(status)}
              >
                New Task
              </Button>
            </Box>
          );
        })}
        {/* Button for adding a new status column */}
        <Button
          sx={{
            width: "100%",
            border: 0,
            minWidth: 300,
            gap: 2,
            borderRadius: 2,
            p: 1,
            background: colors.grey[900],
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
          component="div"
          onClick={handleAddNewStatus}
        >
          <Typography>New Column</Typography>
          <Add />
        </Button>
      </Grid>

      {/* Context Menus for Status and Task Actions */}
      <Menu
        open={Boolean(anchorElStatusMenu)}
        id="status-menu"
        anchorEl={anchorElStatusMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleCloseStatusMenu}
      >
        {/* Menu items for status actions */}
        <MenuItem onClick={() => handleCloseStatusMenu("Manage status")}>
          Manage status
        </MenuItem>
        <MenuItem onClick={() => handleCloseStatusMenu("Delete status")}>
          Delete status
        </MenuItem>
      </Menu>
      <Menu
        open={Boolean(anchorElTaskMenu)}
        id="menu-task-item"
        anchorEl={anchorElTaskMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleCloseTaskMenu}
      >
        {/* Menu item for task deletion */}
        <MenuItem onClick={handleDeleteTask}>Delete Task</MenuItem>
      </Menu>
    </Grid>
  );
};

export default TaskCardComponent;
