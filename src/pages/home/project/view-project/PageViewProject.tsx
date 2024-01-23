import {
  Button,
  Grid,
  Typography,
  Box,
  Skeleton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  ButtonGroup,
  useMediaQuery,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  MoreVert,
  Settings,
  Update,
} from "@mui/icons-material";
import { FC } from "react";
import { useViewProject } from "./Helper";
import AvatarComponent from "../../../../components/common/avatar/AvatarComponent";

import generalFunctions from "../../../../utils/helpers/functions/GeneralFunctions";
import TaskCardComponent from "../../../../components/card/task-card/TaskCardComponent";

/**
 * Functional component representing the view of a project page.
 * Utilizes the custom hook `useViewProject` for managing state and logic.
 */
const PageViewProject: FC = () => {
  // Destructure values from the custom hook
  const {
    project,
    open,
    anchorEl,
    componentPermission,
    handleMenuClose,
    handleMenuOpen,
    handleSettingsNavigation,
    projectMembers,
    handleUpdateProject,
  } = useViewProject();

  // Media query
  const matches = useMediaQuery("(min-width:600px)");

  // Extracted permissions from componentPermission object
  const updateProjectPermission =
    componentPermission["updateProject"]?.permitted;
  const viewTasksPermission = componentPermission["viewTasks"]?.permitted;
  const viewMembersPermission = componentPermission["viewMembers"]?.permitted;
  const viewLabelsPermission = componentPermission["viewLabels"]?.permitted;
  const viewStatusesPermission = componentPermission["viewStatuses"]?.permitted;

  // Combined settings permission based on individual permissions
  const settingsPermission =
    viewLabelsPermission || viewMembersPermission || viewStatusesPermission;

  return (
    <Grid container spacing={2} display="flex">
      {/* Project Details Section */}
      <Grid item xs={12} display="flex" justifyContent="space-between" mt={2}>
        {!project?.name ? (
          // Skeleton while project details are loading
          <Skeleton width={200} height={40} />
        ) : (
          // Display project name
          <Typography variant="h5" overflow="auto" flexWrap="wrap">
            {project?.name}
          </Typography>
        )}
        {/* Buttons for project update and settings */}
        <Box>
          {project &&
            (matches ? (
              <ButtonGroup>
                {updateProjectPermission && (
                  <Button
                    endIcon={<Update />}
                    color="inherit"
                    onClick={handleUpdateProject}
                  >
                    Update
                  </Button>
                )}
                {settingsPermission && (
                  <Button
                    endIcon={<Settings />}
                    color="inherit"
                    onClick={handleSettingsNavigation}
                  >
                    Settings
                  </Button>
                )}
              </ButtonGroup>
            ) : (
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleMenuOpen}
              >
                <MoreVert />
              </IconButton>
            ))}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={12} display="flex" columnGap={5}>
        {/* Project Description Section */}
        <Grid item mb={2} xs={12}>
          <Accordion defaultExpanded={false}>
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="h6">Meta data</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item xs={12}>
                {/* Display project description */}
                <Typography>Description</Typography>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: project?.description ? project?.description : "",
                  }}
                  sx={{ overflow: "auto", textAlign: "justify" }}
                />
              </Grid>
              {/* Contributors section */}
              <Grid item flex={1}>
                <Typography variant="subtitle1">Contributors</Typography>
                <Box
                  mt={1}
                  display="flex"
                  alignItems="center"
                  // justifyContent="center"
                  flexWrap="wrap"
                  // sx={{ height: "auto", overflowY: "auto" }}
                  gap={2}
                >
                  {/* Display contributors */}
                  {projectMembers.map((profileDetails, index) => {
                    return (
                      <Box
                        key={profileDetails.id}
                        display="flex"
                        alignItems="center"
                        flexBasis={130}
                        gap={1}
                      >
                        <AvatarComponent
                          profile
                          width={28}
                          height={28}
                          color={generalFunctions.getColor(index)}
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
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>

      {/* Task Cards Section */}
      <Grid item xs={12} display="flex">
        {/* Include TaskCardComponent */}
        {viewTasksPermission && <TaskCardComponent />}
      </Grid>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
      >
        {updateProjectPermission && (
          <MenuItem
            onClick={() => {
              handleMenuClose();
              handleUpdateProject();
            }}
          >
            Update
          </MenuItem>
        )}
        {settingsPermission && (
          <MenuItem
            onClick={() => {
              handleMenuClose();
              handleSettingsNavigation();
            }}
          >
            Settings
          </MenuItem>
        )}
      </Menu>
    </Grid>
  );
};

export default PageViewProject;
