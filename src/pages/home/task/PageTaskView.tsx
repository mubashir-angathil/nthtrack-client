import { FC } from "react";
import {
  Box,
  Chip,
  Grid,
  Typography,
  Divider,
  Button,
  Menu,
  useMediaQuery,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useTask } from "./Helper";
import AvatarComponent from "../../../components/common/avatar/AvatarComponent";
import RhfLabelAutocomplete from "../../../components/common/textfield/autocomplete/label-autocomplete/RhfLabelAutocomplete";
import { LabelAutocompleteOptionType } from "../../../services/data-services/Helper";
import RhfStatusAutocomplete from "../../../components/common/textfield/autocomplete/status-autocomplete/RhfStatusAutocomplete";
import RhfCKEditorComponent from "../../../components/ck-editor/CkEditorComponent";
import RhfTextfieldComponent from "../../../components/common/textfield/RhfTextFieldComponent";
import generalFunctions from "../../../utils/helpers/functions/GeneralFunctions";
import { MoreVert } from "@mui/icons-material";
import { useComponentPermissionContext } from "../../../utils/helpers/context/component-permission-context/ComponentPermissionContext";

const PageTaskView: FC = () => {
  // Destructure values from the custom hook
  const {
    control,
    open,
    watch,
    resetField,
    handleTaskUpdate,
    handelSetFormValues,
    handleTaskFormUpdate,
    task,
    anchorEl,
    handleMenuClose,
    handleMenuOpen,
  } = useTask();

  // Media query
  const matches = useMediaQuery("(min-width:600px)");

  // Define hover color for styles
  const hoverColor = "rgba(255,255,255,0.1)";
  const { componentPermission } = useComponentPermissionContext();

  // Extracting permissions for updating tasks, status, and labels
  const updateTaskPermission = componentPermission["updateTask"]?.permitted;
  const updateStatusPermission =
    componentPermission["updateStatus"]?.permitted && updateTaskPermission;
  const updateLabelPermission =
    componentPermission["updateLabel"]?.permitted && updateTaskPermission;

  // Define styles object for different components
  const styles = {
    // Style for task title component
    taskTitleComponentStyle: {
      paddingInline: 1,
      borderRadius: 2,
      ":hover": {
        // Apply hover background color if "task" is undefined and updateTaskPermission is granted
        background:
          watch("task") === undefined && updateTaskPermission
            ? hoverColor
            : "none",
      },
    },

    // Style for status component
    statusComponentStyle: {
      borderRadius: 2,
      ":hover": {
        // Apply hover background color if "statusId" is undefined and updateStatusPermission is granted
        background:
          watch("statusId") === undefined && updateStatusPermission
            ? hoverColor
            : "none",
      },
    },

    // Style for label component
    labelComponentStyle: {
      borderRadius: 2,
      ":hover": {
        // Apply hover background color if "labelId" is undefined and updateLabelPermission is granted
        background:
          watch("labelId") === undefined && updateLabelPermission
            ? hoverColor
            : "none",
      },
    },

    // Style for description component
    descriptionComponentStyle: {
      borderRadius: 2,
      paddingInline: 1,
      ":hover": {
        // Apply hover background color if "description" is undefined and updateTaskPermission is granted
        background:
          watch("description") === undefined && updateTaskPermission
            ? hoverColor
            : "none",
      },
    },
  };

  return (
    <>
      {task ? (
        <Grid container spacing={1} gap={2} paddingInline={1}>
          {/* Task ID and Task Name Section */}
          <Grid item xs={12}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              pb={1}
            >
              {/* Editable Task Name */}
              <Box display="flex" flexWrap="wrap">
                <Typography variant="h5" fontWeight="bold">
                  #{task.id}
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  title={updateTaskPermission ? "Double click to update" : ""}
                  sx={styles.taskTitleComponentStyle}
                  onDoubleClick={() =>
                    updateTaskPermission &&
                    handelSetFormValues({ key: "task", value: task.task })
                  }
                >
                  {watch("task") !== undefined ? (
                    <RhfTextfieldComponent
                      control={control}
                      label=""
                      name="task"
                      autoFocus
                      size="small"
                      onBlur={(newTask?: string) => {
                        if (newTask !== task.task) {
                          handleTaskUpdate({ task: newTask });
                        } else {
                          resetField("task");
                        }
                      }}
                    />
                  ) : (
                    task?.task
                  )}
                </Typography>
              </Box>

              {/* Update Button */}
              {updateTaskPermission && (
                <Button
                  onClick={handleTaskFormUpdate}
                  variant="contained"
                  sx={{
                    display: !matches ? "none" : "inline-block",
                  }}
                >
                  Update
                </Button>
              )}

              {/* Update Button */}
              {updateTaskPermission && (
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{ display: matches ? "none" : "inline-block" }}
                >
                  <MoreVert />
                </IconButton>
              )}
            </Box>
            <Divider />
          </Grid>

          {/* Project Details Section */}
          <Grid
            item
            xs={12}
            md={10}
            width="auto"
            gap={2}
            display="flex"
            flexDirection="column"
          >
            {/* Status & Label Section */}
            <Grid item xs={12} display="flex" flexDirection="column" gap={2}>
              <Typography
                variant="h6"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                Status & Label
              </Typography>
              <Box
                display="flex"
                columnGap={1}
                sx={styles.statusComponentStyle}
              >
                {/* Editable Status */}
                {watch("statusId") !== undefined && updateStatusPermission ? (
                  <RhfStatusAutocomplete
                    autoFocus
                    control={control}
                    label="Status"
                    name="statusId"
                    defaultValue={task.status}
                    onBlur={(value?: LabelAutocompleteOptionType) => {
                      if (value) {
                        handleTaskUpdate({ status: value });
                      } else {
                        resetField("statusId");
                      }
                    }}
                  />
                ) : (
                  // Display Status Chip
                  <Chip
                    title={
                      updateStatusPermission ? "Double click to update" : ""
                    }
                    onDoubleClick={() =>
                      updateStatusPermission &&
                      handelSetFormValues({
                        key: "status",
                        value: task.status.id,
                      })
                    }
                    label={task?.status.name}
                    sx={{
                      background: `rgba(${task?.status.color},0.3)`,
                      border: 1,
                      borderColor: `rgb(${task?.status.color})`,
                    }}
                  />
                )}
                {/* Editable Label */}
                {watch("labelId") !== undefined && updateLabelPermission ? (
                  <RhfLabelAutocomplete
                    control={control}
                    label="Label"
                    name="labelId"
                    autoFocus
                    defaultValue={task.label}
                    onBlur={(value?: LabelAutocompleteOptionType) => {
                      if (value) {
                        handleTaskUpdate({ label: value });
                      } else {
                        resetField("labelId");
                      }
                    }}
                  />
                ) : (
                  // Display Label Chip
                  <Chip
                    title={
                      updateLabelPermission ? "Double click to update" : ""
                    }
                    label={task?.label.name}
                    sx={{
                      background: `rgb(${task?.label.color},0.3)`,
                      border: 1,
                      borderColor: `rgb(${task?.label.color})`,
                    }}
                    onDoubleClick={() =>
                      updateLabelPermission &&
                      handelSetFormValues({
                        key: "label",
                        value: task.label.id,
                      })
                    }
                  />
                )}
              </Box>
            </Grid>

            {/* Description Section */}
            <Grid item xs={12}>
              <Typography variant="h6" mb={-1}>
                Description
              </Typography>
              {watch("description") !== undefined && updateTaskPermission ? (
                // Editable Description using CKEditor
                <RhfCKEditorComponent
                  control={control}
                  label=""
                  name="description"
                  height="150px"
                  onBlur={(description?: string) => {
                    if (description !== task.description) {
                      handleTaskUpdate({ description });
                    } else {
                      resetField("description");
                    }
                  }}
                />
              ) : (
                // Display Description
                <Typography
                  title={updateTaskPermission ? "Double click to update" : ""}
                  component="div"
                  textAlign="justify"
                  dangerouslySetInnerHTML={{ __html: task?.description ?? "" }}
                  variant="body1"
                  sx={styles.descriptionComponentStyle}
                  onDoubleClick={() => {
                    updateTaskPermission &&
                      handelSetFormValues({
                        key: "description",
                        value: task.description,
                      });
                  }}
                />
              )}
            </Grid>

            {/* Meta data Section */}
            <Grid item xs={12}>
              <Typography variant="h6">Meta data</Typography>
              {/* Display Task Creator and Created At */}
              {task?.createdAt && (
                <Typography variant="subtitle2" color="gray">
                  Created by {task.createdByUser.username}&nbsp;
                  {new Date(task.createdAt).toLocaleString()}
                </Typography>
              )}
              {/* Display Task Updater and Updated At */}
              {task?.updatedAt && task?.updatedByUser?.username && (
                <Typography variant="subtitle2" color="gray">
                  Updated by {task.updatedByUser?.username}&nbsp;
                  {new Date(task.updatedAt).toLocaleString()}
                </Typography>
              )}
            </Grid>
          </Grid>

          {/* Assignees Section */}
          <Grid
            item
            gap={1}
            flex={1}
            mb={2}
            display="flex"
            flexDirection="column"
            justifyContent="start"
            alignItems="start"
          >
            <Typography variant="h6">Assignees</Typography>
            {/* Display Assignees with Avatar and Username */}
            {task?.assignees.map((profileDetails, index) => {
              return (
                <Box key={profileDetails.id} display="flex" gap={1} p="2px">
                  <AvatarComponent
                    key={profileDetails.id}
                    profile
                    {...profileDetails}
                    color={generalFunctions.getColor(index)}
                  />
                  <Typography flexShrink={0}>
                    {profileDetails.username}
                  </Typography>
                </Box>
              );
            })}
          </Grid>
        </Grid>
      ) : (
        // Display when no task is found
        <>No Task found</>
      )}
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            handleTaskFormUpdate();
          }}
        >
          Update{" "}
        </MenuItem>
      </Menu>
    </>
  );
};

export default PageTaskView;
