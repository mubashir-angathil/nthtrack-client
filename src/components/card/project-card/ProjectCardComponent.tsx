import React, { useId } from "react";
import {
  Badge,
  Box,
  Card,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Tooltip,
  Typography,
} from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import { ProjectCardComponentProps } from "./Helper";

const ProjectCardComponent: React.FC<ProjectCardComponentProps> = ({
  projects,
}) => {
  return (
    <List
      dense
      disablePadding
      sx={{ overflowY: "auto", height: "calc(100vh - 25vh)" }}
    >
      {projects.map(
        ({ projectTitle, numberOfIssues, description, status }, index) => {
          return (
            <ListItem
              key={projectTitle.concat(index.toString())}
              sx={{
                ":active": {
                  transform: "scale(0.99)",
                },
              }}
            >
              <ListItemButton dense disableGutters onClick={() => alert("ad")}>
                <Card>
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
              </ListItemButton>
            </ListItem>
          );
        },
      )}
    </List>
  );
};

export default ProjectCardComponent;
