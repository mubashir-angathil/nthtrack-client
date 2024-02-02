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
  Badge,
  AvatarGroup,
  Chip,
  useMediaQuery,
  ToggleButton,
  Divider,
  useTheme,
} from "@mui/material";
import { useTaskComponent } from "./Helper";
import AvatarComponent from "../../common/avatar/AvatarComponent";
import routes from "../../../utils/helpers/routes/Routes";
import {
  Add,
  Clear,
  FilterList,
  MoreHoriz,
  MoreVert,
  Search,
} from "@mui/icons-material";
import { StatusInterface } from "../../../services/project-services/Helper";
import RhfLabelAutocomplete from "../../common/textfield/autocomplete/label-autocomplete/RhfLabelAutocomplete";
import { colors as Colors } from "../../../utils/helpers/configs/Colors";
import { taskCardStyle } from "./Style";
import generalFunctions from "../../../utils/helpers/functions/GeneralFunctions";
import { useComponentPermissionContext } from "../../../utils/helpers/context/component-permission-context/ComponentPermissionContext";

// Functional component for rendering the Task Card
const TaskCardComponent: React.FC = () => {
  // Extracted values and functions from the custom hook
  const {
    project,
    control,
    toggleComponent,
    tasks,
    activeTask,
    anchorElStatusMenu,
    handleComponentToggle,
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
    allowDropHandler,
    dragHandler,
    dropHandler,
    removeDragEffect,
  } = useTaskComponent();
  const { componentPermission } = useComponentPermissionContext();
  // Media query
  const matches = useMediaQuery("(min-width:600px)");
  const theme = useTheme();

  const SearchComponent: React.FC = () => (
    <TextField
      id="task-search-field"
      variant="outlined"
      type="search"
      size="small"
      fullWidth
      value={search}
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
  );

  const style = taskCardStyle;
  const addTaskPermission = componentPermission["addNewTask"]?.permitted;
  const viewTaskPermission = componentPermission["viewTask"]?.permitted;
  const deleteTaskPermission = componentPermission["deleteTask"]?.permitted;
  const updateTaskPermission = componentPermission["updateTask"]?.permitted;
  const addStatusPermission = componentPermission["addNewStatus"]?.permitted;
  const updateStatusPermission = componentPermission["updateStatus"]?.permitted;
  const deleteStatusPermission = componentPermission["deleteStatus"]?.permitted;

  return (
    <Grid container spacing={2}>
      {/* Search and Label Filter Section */}
      <Grid item xs={12} component="form" alignItems="center" gap={2}>
        {matches ? (
          <Grid display="flex" gap={2}>
            {/* Search Input Field */}
            <SearchComponent />
            {/* Tracker Filter  */}
            <RhfLabelAutocomplete
              control={control}
              name="labelId"
              label="Label"
              size="small"
              fullWidth
              addNewOption={false}
            />
          </Grid>
        ) : (
          <>
            <Grid
              item
              xs={12}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6">Tasks</Typography>
              <Box display="flex" gap={1}>
                <ToggleButton
                  value="search"
                  sx={{ width: 26, height: 26, borderRadius: 2 }}
                  selected={toggleComponent.search}
                  onClick={() => handleComponentToggle("search")}
                >
                  <Search fontSize="medium" />
                </ToggleButton>
                <ToggleButton
                  value="filter"
                  selected={toggleComponent.filter}
                  sx={{ width: 26, height: 26, borderRadius: 2 }}
                  onClick={() => handleComponentToggle("filter")}
                >
                  <FilterList fontSize="small" />
                </ToggleButton>
              </Box>
            </Grid>
            <Divider />
            {!matches && (toggleComponent.search || toggleComponent.filter) && (
              <Grid item xs={12} mt={2} gap={2} display="grid">
                {toggleComponent.search && <SearchComponent />}
                {toggleComponent.filter && (
                  <RhfLabelAutocomplete
                    control={control}
                    name="labelId"
                    label="Label"
                    size="small"
                    fullWidth
                    addNewOption={false}
                  />
                )}
              </Grid>
            )}
          </>
        )}
      </Grid>

      {/* Task Status Columns Section */}
      <Grid item xs={12} sx={style.statusColumnContainer}>
        {/* Map through each status and render the corresponding column */}
        {project?.statuses?.map((status: StatusInterface) => {
          return (
            <Card
              key={status.id}
              component="div"
              id={`status${status.id}`}
              onDrop={(e) => dropHandler(e, status)}
              onDragOver={(e) => allowDropHandler(e, status)}
              onDragLeave={() => removeDragEffect(status.id)}
              sx={style.statusCard}
            >
              {/* Header section for each status column */}
              <Box
                sx={{
                  ...style.statusCardHeader,
                  background:
                    theme.palette.mode === "dark"
                      ? "black"
                      : theme.palette.primary.main,
                }}
              >
                {/* Status Title, Color Indicator, and Task Count Badge */}
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    component="span"
                    border={2}
                    borderColor={`rgb(${status.color})`}
                    borderRadius={2}
                    width={20}
                    height={20}
                  />
                  <Typography variant="subtitle1">{status.name}</Typography>
                  <Badge
                    badgeContent={tasks[status.name]?.length}
                    color="success"
                  />
                </Box>
                {/* Menu button for status actions */}
                {(updateStatusPermission || deleteStatusPermission) && (
                  <IconButton onClick={(e) => handleOpenStatusMenu(e, status)}>
                    <MoreHoriz sx={{ color: "white" }} />
                  </IconButton>
                )}
              </Box>

              {/* Task Cards within each status column */}
              <Box
                height="55dvh"
                overflow="auto"
                pt={1}
                paddingInline={1}
                component="div"
              >
                {tasks[status.name]?.map((task) => {
                  return (
                    <Card
                      key={task.id}
                      sx={{
                        ...style.taskCardStyle,
                        "&:hover": {
                          cursor: updateTaskPermission ? "grab" : "auto",
                        },
                        "&:active": {
                          cursor: updateTaskPermission ? "grabbing" : "auto",
                        },
                        boxShadow: theme.palette.mode === "light" ? 1 : 0,
                        borderColor:
                          activeTask?.id === task.id
                            ? Colors.primary
                            : "transparent",
                      }}
                      elevation={0}
                      component="div"
                      draggable={updateTaskPermission}
                      onDragEnd={(event: any) => {
                        if (event && updateTaskPermission) {
                          event.target.style.border = "initial";
                        }
                      }}
                      onDragStart={(event: any) => {
                        if (updateTaskPermission) {
                          event &&
                            (event.target.style.border = "1.2px solid red");

                          dragHandler(task, status);
                        }
                      }}
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
                        {deleteTaskPermission && (
                          <IconButton
                            size="small"
                            onClick={(e) =>
                              handleOpenTaskMenu(e, task.id, status)
                            }
                          >
                            <MoreVert fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                      <Typography
                        sx={{
                          ...style.taskTitle,
                          ":hover": {
                            color: viewTaskPermission ? "Highlight" : "none",
                            cursor: viewTaskPermission ? "pointer" : "auto",
                          },
                        }}
                        onClick={() => {
                          if (viewTaskPermission)
                            navigate(
                              routes.tasks.path.concat(task.id.toString()),
                            );
                        }}
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
                        componentsProps={style.additionalAvatar}
                      >
                        {task.assignees.map((profile, index) => {
                          return (
                            <AvatarComponent
                              profile={true}
                              key={profile.id}
                              {...profile}
                              color={generalFunctions.getColor(index)}
                            />
                          );
                        })}
                      </AvatarGroup>
                    </Card>
                  );
                })}
              </Box>
              {addTaskPermission && (
                <Button
                  variant="outlined"
                  onClick={() => handleCreateTask(status)}
                >
                  New Task
                </Button>
              )}
            </Card>
          );
        })}
        {/* Button for adding a new status column */}
        {addStatusPermission && (
          <ToggleButton value="new-column" onClick={handleAddNewStatus}>
            <Add />
          </ToggleButton>
        )}
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
        {componentPermission["updateStatus"]?.permitted && (
          <MenuItem onClick={() => handleCloseStatusMenu("Manage status")}>
            Manage status
          </MenuItem>
        )}
        {componentPermission["deleteStatus"]?.permitted && (
          <MenuItem onClick={() => handleCloseStatusMenu("Delete status")}>
            Delete status
          </MenuItem>
        )}
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
