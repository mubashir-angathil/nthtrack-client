import React from "react";
import { Card, Typography, Box, colors, Button } from "@mui/material";
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
          return (
            <Card
              key={id}
              elevation={0}
              className="btn"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: "1em",
                backgroundColor: "transparent",
                border: 1,
                gap: 1,
                m: 2,
                borderColor: taskStatus ? colors.red.A200 : colors.blue[500],
              }}
              onClick={() => navigate(routes.tasks.path.concat(id.toString()))}
            >
              <Typography>#{id}</Typography>
              <Typography variant="body1">{tracker.name}</Typography>
              <Typography>{taskStatus ? "New" : status.name}</Typography>
              <Typography width={350}>{description}</Typography>
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
