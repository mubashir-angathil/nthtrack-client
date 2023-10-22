import React from "react";
import {
  Badge,
  Card,
  Chip,
  Divider,
  Grid,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import { ProjectCardComponentProps } from "./Helper";
import { useNavigate } from "react-router-dom";
import routes from "../../../utils/helpers/routes/Routes";
import noDataImage from "../../../assets/noData.svg";

// ProjectCardComponent component
const ProjectCardComponent: React.FC<ProjectCardComponentProps> = ({
  projects,
  handleProjectLoading,
}) => {
  // React router navigation hook
  const navigate = useNavigate();

  return (
    // Container for project cards
    <Box
      component="div"
      gap={1}
      sx={{ overflowY: "auto", height: "calc(100vh - 25vh)" }}
      onScroll={handleProjectLoading}
    >
      {projects.length > 0 ? (
        // Displaying project cards
        projects.map(
          ({ projectName, id, taskCount, description, status }, index) => {
            return (
              // Individual project card
              <Card
                key={id}
                sx={{
                  m: 2,
                }}
                className="btn"
                onClick={() =>
                  navigate(routes.projects.path.concat(id.toString()))
                }
              >
                <Grid container p={3}>
                  {/* Project name and metadata */}
                  <Grid
                    item
                    xs={12}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Typography variant="h5" fontWeight="550">
                      {projectName}
                    </Typography>
                    {/* Badges for open issues and status */}
                    <Box display="flex" gap={2}>
                      <Tooltip title="No of open issue">
                        <Badge
                          badgeContent={taskCount}
                          variant="standard"
                          color="warning"
                        >
                          <BugReportIcon />
                        </Badge>
                      </Tooltip>
                      <Tooltip title="Status">
                        <Chip
                          variant="filled"
                          label={status.name}
                          color={
                            status.name === "Opened" ? "warning" : "default"
                          }
                          size="small"
                        />
                      </Tooltip>
                    </Box>
                  </Grid>
                  {/* Divider for separation */}
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  {/* Project description */}
                  <Grid item xs={12}>
                    <Typography>{description}</Typography>
                  </Grid>
                </Grid>
              </Card>
            );
          },
        )
      ) : (
        // Display when there are no projects
        <Box
          justifyContent="center"
          display="flex"
          flexDirection="column"
          alignItems="center"
          height={400}
        >
          <Box component="img" width={300} height={200} src={noDataImage} />
          <Typography margin={2} variant="h5">
            No Projects
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProjectCardComponent;
