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
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Settings,
  Update,
} from "@mui/icons-material";
import { FC } from "react";
import { useViewProject } from "./Helper";
import AvatarComponent from "../../../../components/common/avatar/AvatarComponent";
import routes from "../../../../utils/helpers/routes/Routes";

import TaskCardComponent from "../../../../components/card/task-card/TaskCardComponent";

/**
 * Functional component representing the view of a project page.
 * Utilizes the custom hook `useViewProject` for managing state and logic.
 */
const PageViewProject: FC = () => {
  // Destructure values from the custom hook
  const { project, navigate, projectMembers, handleUpdateProject } =
    useViewProject();

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
          {project && (
            <ButtonGroup>
              <Button
                endIcon={<Update />}
                color="inherit"
                onClick={handleUpdateProject}
              >
                Update
              </Button>
              <Button
                endIcon={<Settings />}
                color="inherit"
                onClick={() =>
                  navigate(routes.projectSettings.path, {
                    state: {
                      project: { id: project?.id, name: project?.name },
                    },
                  })
                }
              >
                Settings
              </Button>
            </ButtonGroup>
          )}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={12} display="flex" columnGap={5}>
        {/* Project Description Section */}
        <Grid item mb={2} xs={12}>
          <Accordion defaultExpanded>
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="h6">Meta data</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: "flex" }}>
              <Grid item md={10}>
                {/* Display project description */}
                <Typography>Description</Typography>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: project?.description ? project?.description : "",
                  }}
                  sx={{ overflow: "auto", textAlign: "justify", pr: 2 }}
                />
              </Grid>
              {projectMembers.length > 0 && (
                // Contributors section
                <Grid item md={2}>
                  <Typography variant="subtitle1">Contributors</Typography>
                  <Box
                    mt={1}
                    display="flex"
                    flexWrap="wrap"
                    alignItems="center"
                    sx={{ height: "auto", overflowY: "auto" }}
                    gap={2}
                  >
                    {/* Display contributors */}
                    {projectMembers.map((profileDetails, index) => {
                      return (
                        <Box key={profileDetails.id} pt={index > 0 ? 1 : 0}>
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
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>

      {/* Task Cards Section */}
      <Grid item xs={12} display="flex">
        {/* Include TaskCardComponent */}
        <TaskCardComponent />
      </Grid>
    </Grid>
  );
};

export default PageViewProject;
