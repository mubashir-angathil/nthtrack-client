import React from "react";
import {
  Card,
  Typography,
  Box,
  colors,
  Chip,
  Divider,
  Grid,
  Tooltip,
  IconButton,
  AvatarGroup,
} from "@mui/material";
import { TaskCardComponentProps } from "./Helper";
import { useNavigate } from "react-router-dom";
import routes from "../../../utils/helpers/routes/Routes";
import noDataImage from "../../../assets/noData.svg";
import { CloseRounded, Visibility } from "@mui/icons-material";
import AvatarComponent from "../../common/avatar/AvatarComponent";

// TaskCardComponent component
const TaskCardComponent: React.FC<TaskCardComponentProps> = ({
  tasks,
  handleTaskLoading,
}) => {
  // React router navigation hook
  const navigate = useNavigate();
  return (
    // Container for task cards
    <Box
      component="div"
      gap={1}
      sx={{ overflowY: "auto", height: "calc(100vh - 44vh)" }}
      onScroll={handleTaskLoading}
    >
      {tasks.length > 0 ? (
        // Displaying task cards
        tasks.map(
          ({
            id,
            status,
            tracker,
            description,
            createdAt,
            closedAt,
            assignees,
            closedByUser,
            createdByUser,
            updatedAt,
            updatedByUser,
          }) => {
            const taskStatus = status.name === "Opened";
            const bug = tracker.name === "Bug";

            return (
              <Card
                key={id}
                elevation={0}
                className="appear"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: "1em",
                  backgroundColor: "transparent",
                  flexWrap: "wrap",
                  border: 1,
                  mr: 1,
                  mb: 2,
                  transition: "all 0.5s",
                  borderColor: taskStatus
                    ? bug
                      ? colors.red.A200
                      : colors.green.A400
                    : colors.grey.A400,
                }}
              >
                <Grid container p={1}>
                  {/* Task name and metadata */}
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
                        Task {id}
                      </Typography>
                      <Tooltip title="Tracker">
                        <Chip
                          label={tracker.name}
                          variant="outlined"
                          size="small"
                          color={
                            taskStatus ? (bug ? "error" : "success") : "info"
                          }
                        />
                      </Tooltip>
                    </Grid>
                    {/* Badges for open issues and status */}
                    <Box display="flex" gap={1} alignItems="center">
                      <AvatarGroup max={4}>
                        {assignees.map((profile) => (
                          <AvatarComponent
                            key={profile.id}
                            profile
                            {...profile}
                            sx={{ fontSize: 15 }}
                          />
                        ))}
                      </AvatarGroup>
                      <Tooltip title="Status">
                        <Chip
                          variant="outlined"
                          label={status.name}
                          color={
                            status.name === "Opened" ? "warning" : "default"
                          }
                          size="small"
                        />
                      </Tooltip>

                      <Tooltip title="View">
                        <IconButton
                          size="small"
                          onClick={() =>
                            navigate(routes.tasks.path.concat(id.toString()))
                          }
                          color="success"
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Close task">
                        <span>
                          <IconButton
                            size="small"
                            onClick={() =>
                              navigate(
                                routes.projects.path.concat(id.toString()),
                              )
                            }
                            color={taskStatus ? "error" : "primary"}
                            disabled={!taskStatus}
                          >
                            <CloseRounded />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </Box>
                  </Grid>
                  {/* Divider for separation */}
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  {/* Task description */}
                  <Grid item xs={12}>
                    <Typography component="div" id="projectDescription">
                      {/* {description} */}
                      <Box
                        component="div"
                        dangerouslySetInnerHTML={{
                          __html: description,
                        }}
                      />
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    display="flex"
                    justifyContent="space-between"
                    flexWrap="wrap"
                  >
                    <Typography variant="caption" color="gray">
                      Created by {createdByUser.username} at{" "}
                      {new Date(createdAt).toLocaleString()}
                    </Typography>
                    {updatedByUser !== null && (
                      <Typography variant="caption" color="gray">
                        Updated by {updatedByUser?.username} at{" "}
                        {new Date(updatedAt).toLocaleString()}
                      </Typography>
                    )}
                    {closedByUser !== null && closedAt && (
                      <Typography variant="caption" color="gray">
                        Closed by {closedByUser?.username} at
                        {new Date(closedAt).toLocaleString()}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Card>
            );
          },
        )
      ) : (
        // Display when there are no tasks
        <Box
          justifyContent="center"
          display="flex"
          flexDirection="column"
          alignItems="center"
          height={300}
        >
          <Box component="img" width={300} height={200} src={noDataImage} />
          <Typography margin={2} variant="h5">
            No Tasks
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TaskCardComponent;
