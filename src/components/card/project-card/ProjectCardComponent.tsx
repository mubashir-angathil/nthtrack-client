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
import { useNavigate } from "react-router-dom";

const ProjectCardComponent: React.FC<ProjectCardComponentProps> = ({
  projects,
}) => {
  const navigate = useNavigate();

  return (
    <Box
      component="div"
      gap={1}
      sx={{ overflowY: "auto", height: "calc(100vh - 25vh)" }}
    >
      {projects.map(
        ({ projectTitle, numberOfIssues, description, status }, index) => {
          return (
            <Card
              key={projectTitle.concat(index.toString())}
              sx={{
                m: 2,
              }}
              className="btn"
              onClick={() => navigate("project/".concat(index.toString()))}
            >
              <Grid container p={3}>
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="space-between"
                >
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
        },
      )}
    </Box>
  );
};

export default ProjectCardComponent;
