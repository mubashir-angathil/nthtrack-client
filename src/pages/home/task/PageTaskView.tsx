import { FC, useState } from "react";
import {
  Button,
  Box,
  Chip,
  Grid,
  Typography,
  Skeleton,
  Divider,
  AvatarGroup,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { useTask } from "./Helper";
import { colors } from "../../../utils/helpers/configs/Colors";
import UpdateButtonComponent from "../../../components/common/buttons/UpdateButtonComponent";
import AvatarComponent from "../../../components/common/avatar/AvatarComponent";
import { ExpandMore } from "@mui/icons-material";

const PageTaskView: FC = () => {
  const { task, handleCloseTask, handleTaskUpdate } = useTask();
  const [expanded, setExpanded] = useState<{
    [key: string]: boolean;
  }>({
    description: true,
    metaData: true,
  });
  const handleChange = (key: "description" | "metaData") => {
    setExpanded((preValue) => {
      return { ...preValue, [key]: !preValue[key] };
    });
  };
  return (
    <Grid container mt={2} spacing={2}>
      {/* Task Header */}
      <Grid item xs={12} display="flex" justifyContent="space-between">
        <Typography variant="h4" display="flex">
          Task: #
          {task?.id === 0 ? <Skeleton width={30} height={40} /> : task?.id}
        </Typography>
        <Grid>
          {task?.status.name === "Opened" ? (
            <>
              {/* Button to update task */}
              <UpdateButtonComponent
                title="Update task"
                size="small"
                onClick={handleTaskUpdate}
                sx={{ mr: 1 }}
              />

              <Button
                variant="contained"
                size="small"
                onClick={handleCloseTask}
              >
                Close task
              </Button>
            </>
          ) : undefined}
        </Grid>
      </Grid>

      <Grid item md={10} gap={2}>
        {/* Task Details */}
        <Accordion
          expanded={expanded?.description}
          onChange={() => handleChange("description")}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="description-content"
            id="description-header"
          >
            {/* <Typography>Description</Typography> */}
            {/* Tracker Information */}
            <Typography component="span" display="flex">
              <Box component="span" color={colors.secondaryText}>
                Tracker:&nbsp;
              </Box>
              {task?.tracker.name === "" ? (
                <Skeleton width={50} height={20} variant="rounded" />
              ) : (
                <Chip size="small" label={task?.tracker.name} color="error" />
              )}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              columnGap: 2,
            }}
          >
            {!task?.description ? (
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
                  __html: task.description,
                }}
                flexWrap="wrap"
              />
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded?.metaData}
          onChange={() => handleChange("metaData")}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="meta-content"
            id="meta-header"
          >
            <Typography>Meta data</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              columnGap: 2,
            }}
          >
            {/* Display Created At */}
            {task?.createdAt && task?.createdByUser?.username && (
              <Typography display="flex" color="gray">
                Updated by {task.createdByUser.username}{" "}
                {new Date(task.createdAt).toLocaleString()}
              </Typography>
            )}

            {task === undefined && <Skeleton width={200} height={20} />}

            {/* Display Updated At */}
            {task?.updatedAt && task?.updatedByUser?.username && (
              <Typography display="flex" color="gray">
                Updated by {task.updatedByUser.username}{" "}
                {new Date(task.updatedAt).toLocaleString()}
              </Typography>
            )}

            {task === undefined && <Skeleton width={200} height={20} />}

            {/* Display Closed At */}
            {task?.closedAt && task?.closedByUser?.username && (
              <Typography display="flex" color="gray">
                Updated by {task.closedByUser.username}{" "}
                {new Date(task.closedAt).toLocaleString()}
              </Typography>
            )}

            {task === undefined && <Skeleton width={200} height={20} />}
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item md={2}>
        <Typography>Assignees</Typography>
        <Divider />
        <Box mt={1}>
          <AvatarGroup
            max={10}
            total={task?.assignees.length}
            sx={{
              display: "flex",
              justifyContent: "start",
              flexWrap: "wrap",
            }}
          >
            {task?.assignees.map((profileDetails) => {
              return (
                <AvatarComponent
                  key={profileDetails.id}
                  profile
                  {...profileDetails}
                />
              );
            })}
          </AvatarGroup>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PageTaskView;
