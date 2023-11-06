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
  Button,
  IconButton,
} from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import { ProjectCardComponentProps, useManageProjectCard } from "./Helper";
import routes from "../../../utils/helpers/routes/Routes";
import noDataImage from "../../../assets/noData.svg";
import { Visibility } from "@mui/icons-material";
import { projectCardStyle } from "./Style";

/**
 * ProjectCardComponent
 *
 * React component for displaying project cards.
 *
 * @component
 * @param {ProjectCardComponentProps} props - Props for ProjectCardComponent.
 * @returns {React.Element} Rendered ProjectCardComponent.
 */
const ProjectCardComponent: React.FC<ProjectCardComponentProps> = ({
  projects,
  handleProjectLoading,
}) => {
  // Custom hook for managing project cards
  const { more, navigate, handleSetMore } = useManageProjectCard(projects);
  const style = projectCardStyle;

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

        projects.map(({ name, id, taskCount, description, status }) => {
          return (
            // Individual project card
            <Card
              key={id}
              className="appear"
              sx={{
                m: 2,
              }}
              elevation={3}
            >
              <Grid container p={3}>
                {/* Project name and metadata */}
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Grid item display="flex" gap={1} alignItems="center">
                    <Typography
                      variant="h5"
                      fontWeight="550"
                      style={{
                        maxWidth: 300,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        lineHeight: 1,
                      }}
                    >
                      {name.toLocaleUpperCase()}
                    </Typography>
                    <Tooltip title="Status">
                      <Chip
                        variant="filled"
                        label={status.name}
                        color={status.name === "Opened" ? "warning" : "default"}
                        size="small"
                      />
                    </Tooltip>
                  </Grid>
                  {/* Badges for open issues and status */}
                  <Box display="flex" gap={1} alignItems="center">
                    <Tooltip title="tasks">
                      <Badge
                        badgeContent={taskCount}
                        variant="standard"
                        color="warning"
                      >
                        <BugReportIcon />
                      </Badge>
                    </Tooltip>
                    <Tooltip title="View">
                      <IconButton
                        size="small"
                        onClick={() =>
                          navigate(routes.projects.path.concat(id.toString()))
                        }
                        color="success"
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid>
                {/* Divider for separation */}
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                {/* Project description */}
                <Grid item xs={12}>
                  <Typography
                    component="div"
                    id="projectDescription"
                    sx={{
                      ...style.description,
                      overflow: more[id] ? "hidden" : null,
                      height: more[id] ? 60 : "auto",
                    }}
                  >
                    {/* {description} */}
                    <Box
                      component="div"
                      dangerouslySetInnerHTML={{
                        __html: description,
                      }}
                    />
                  </Typography>
                  {more[id] && (
                    <Button onClick={() => handleSetMore(id)}>More...</Button>
                  )}
                  {more[id] === false && (
                    <Button onClick={() => handleSetMore(id)}>less...</Button>
                  )}
                </Grid>
              </Grid>
            </Card>
          );
        })
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
