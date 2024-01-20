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
                  title="Double click to update"
                  sx={{
                    ":hover": {
                      cursor: "text",
                    },
                  }}
                  onDoubleClick={() =>
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
              <Button
                onClick={handleTaskFormUpdate}
                variant="contained"
                sx={{ display: !matches ? "none" : "inline-block" }}
              >
                Update
              </Button>
              <IconButton
                onClick={handleMenuOpen}
                sx={{ display: matches ? "none" : "inline-block" }}
              >
                <MoreVert />
              </IconButton>
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
              <Box display="flex" columnGap={1}>
                {/* Editable Status */}
                {watch("statusId") !== undefined ? (
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
                    title="Double click to update"
                    onDoubleClick={() =>
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
                {watch("labelId") !== undefined ? (
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
                    title="Double click to update"
                    label={task?.label.name}
                    sx={{
                      background: `rgb(${task?.label.color},0.3)`,
                      border: 1,
                      borderColor: `rgb(${task?.label.color})`,
                    }}
                    onDoubleClick={() =>
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
              {watch("description") !== undefined ? (
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
                  title="Double click to update"
                  component="div"
                  textAlign="justify"
                  dangerouslySetInnerHTML={{ __html: task?.description ?? "" }}
                  variant="body1"
                  onDoubleClick={() => {
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
