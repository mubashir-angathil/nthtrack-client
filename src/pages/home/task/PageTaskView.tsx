import { FC } from "react";
import { Button, Box, Chip, Grid, Typography, Skeleton } from "@mui/material";
import { useTask } from "./Helper";
import { colors } from "../../../utils/helpers/configs/Colors";
import UpdateButtonComponent from "../../../components/common/buttons/UpdateButtonComponent";

const PageTaskView: FC = () => {
  const { task, handleCloseTask, handleTaskUpdate } = useTask();

  return (
    <Grid container gap={2} mt={2}>
      {/* Task Header */}
      <Grid item xs={12} display="flex" justifyContent="space-between">
        <Typography variant="h4" display="flex">
          #task:
          {task.id === 0 ? <Skeleton width={30} height={40} /> : task.id}
        </Typography>
        <Grid>
          {/* Button to update task */}
          <UpdateButtonComponent
            title="Update task"
            size="small"
            onClick={handleTaskUpdate}
            sx={{ mr: 1 }}
          />
          {/* Button to close task, disabled if task is not in "Opened" status */}
          {task.status.name === "Opened" ? (
            <Button variant="contained" size="small" onClick={handleCloseTask}>
              Close task
            </Button>
          ) : undefined}
        </Grid>
      </Grid>

      {/* Task Details */}
      <Grid item xs={12} gap={2}>
        {/* Tracker Information */}
        <Typography component="span" display="flex">
          <Box component="span" color={colors.secondaryText}>
            Tracker:&nbsp;
          </Box>
          {task.tracker.name === "" ? (
            <Skeleton width={50} height={20} variant="rounded" />
          ) : (
            <Chip size="small" label={task.tracker.name} color="error" />
          )}
        </Typography>

        {/* Display Created At */}
        <Typography display="flex">
          <Box component="span" color={colors.secondaryText}>
            Created At:
          </Box>
          {task.createdAt === "" ? (
            <Skeleton width={200} height={20} />
          ) : (
            new Date(task.createdAt).toLocaleString()
          )}
        </Typography>

        {/* Display Updated At */}
        <Typography display="flex">
          <Box component="span" color={colors.secondaryText}>
            Updated At:
          </Box>
          {task.updatedAt === "" ? (
            <Skeleton width={200} height={20} />
          ) : (
            new Date(task.updatedAt).toLocaleString()
          )}
        </Typography>

        {/* Task Description */}
        <Typography gutterBottom color="ActiveBorder">
          Description:
        </Typography>
        {task.description === "" ? (
          // Display Skeleton if description is not available
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          // Display task description
          <Typography
            component="div"
            dangerouslySetInnerHTML={{
              __html: task?.description,
            }}
            flexWrap="wrap"
          />
        )}
      </Grid>
    </Grid>
  );
};

export default PageTaskView;
