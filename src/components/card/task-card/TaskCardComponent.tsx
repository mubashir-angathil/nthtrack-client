import React from "react";
import { Card, Typography, Box, colors, Button, Chip } from "@mui/material";
import { TaskCardComponentProps } from "./Helper";
import { useNavigate } from "react-router-dom";
import routes from "../../../utils/helpers/routes/Routes";
import noDataImage from "../../../assets/noData.svg";

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
        tasks.map(({ id, status, tracker, description, createdAt }) => {
          const taskStatus = status.name === "Opened";
          const bug = tracker.name === "Bug";

          return (
            <Card
              key={id}
              elevation={0}
              className="btn"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: "1em",
                backgroundColor: "transparent",
                flexWrap: "wrap",
                border: 1,
                gap: 1,
                m: 2,
                borderColor: taskStatus
                  ? bug
                    ? colors.red.A200
                    : colors.green.A400
                  : colors.grey.A400,
              }}
              onClick={() => navigate(routes.tasks.path.concat(id.toString()))}
            >
              <Typography>#{id}</Typography>
              <Chip
                label={tracker.name}
                variant="outlined"
                color={taskStatus ? (bug ? "warning" : "success") : "info"}
              />
              <Typography>{taskStatus ? "New" : status.name}</Typography>
              <Typography
                width={350}
                dangerouslySetInnerHTML={{
                  __html: description
                    .slice(0, 50)
                    .concat(description.length > 40 ? "..." : ""),
                }}
              />
              <Typography>{new Date(createdAt).toLocaleString()}</Typography>
              <Button
                variant={taskStatus ? "contained" : "text"}
                size="small"
                sx={{ height: 40 }}
                color={taskStatus ? "error" : "primary"}
                disabled={!taskStatus}
              >
                {taskStatus ? "Close" : "Closed"}
              </Button>
            </Card>
          );
        })
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
