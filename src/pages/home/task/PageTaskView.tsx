import { FC } from "react";
import { Button, Box, Chip, Grid, Typography, Skeleton } from "@mui/material";
import { useTask } from "./Helper";

const PageTaskView: FC = () => {
  const { task, fetchCloseTaskById } = useTask();

  return (
    <Grid container gap={2} mt={2}>
      {/* Task Header */}
      <Grid item xs={12} display="flex" justifyContent="space-between">
        <Typography variant="h4" display="flex">
          #task:
          {task.id === 0 ? <Skeleton width={30} height={40} /> : task.id}
        </Typography>
        {/* Button to close task, disabled if task is not in "Opened" status */}
        {task.status.name === "Opened" ? (
          <Button
            variant="contained"
            size="small"
            onClick={async () => await fetchCloseTaskById()}
          >
            Close task
          </Button>
        ) : undefined}
      </Grid>

      {/* Task Details */}
      <Grid item xs={12} gap={2}>
        {/* Tracker Information */}
        <Typography component="span" display="flex">
          <Box component="span" color="ActiveBorder">
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
          Created At:
          {task.createdAt === "" ? (
            <Skeleton width={200} height={20} />
          ) : (
            new Date(task.createdAt).toLocaleString()
          )}
        </Typography>

        {/* Display Updated At */}
        <Typography display="flex">
          Updated At:
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
          <Typography>{task.description}</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default PageTaskView;
