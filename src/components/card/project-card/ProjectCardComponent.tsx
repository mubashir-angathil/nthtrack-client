import React from "react";
import {
  Badge,
  Box,
  Card,
  Chip,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import { ProjectCardComponentProps } from "./Helper";

const ProjectCardComponent: React.FC<ProjectCardComponentProps> = ({
  projects,
}) => {
  return (
    <>
      {projects.map(({ projectTitle, numberOfIssues, description, status }) => {
        return (
          <Card sx={{ mt: 1 }}>
            <Grid container spacing={1} p={3}>
              <Grid item xs={12} display="flex" justifyContent="space-between">
                <Typography variant="h5" fontWeight="550">
                  {projectTitle}
                </Typography>
                <Box display="flex" gap={2}>
                  <Tooltip title="No of open issue">
                    <Badge
                      badgeContent={numberOfIssues}
                      variant="standard"
                      color="warning"
                    >
                      <BugReportIcon />
                    </Badge>
                  </Tooltip>
                  <Tooltip title="Status">
                    <Chip
                      variant="filled"
                      label={status === "opened" ? "opened" : "closed"}
                      color={status === "opened" ? "warning" : "default"}
                      size="small"
                    />
                  </Tooltip>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography>{description}</Typography>
              </Grid>
            </Grid>
          </Card>
        );
      })}
    </>
  );
};

export default ProjectCardComponent;
