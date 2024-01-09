import React from "react";
import {
  Card,
  Divider,
  Typography,
  Box,
  LinearProgress,
  LinearProgressProps,
  AvatarGroup,
  Tooltip,
} from "@mui/material";
import { ProjectCardComponentProps, useManageProjectCard } from "./Helper";
import routes from "../../../utils/helpers/routes/Routes";
import noDataImage from "../../../assets/noData.svg";
import { CalendarMonth } from "@mui/icons-material";
import AvatarComponent from "../../common/avatar/AvatarComponent";
import { labelColors } from "../../../utils/helpers/configs/Colors";

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
  const { navigate, more } = useManageProjectCard(projects);

  return (
    <Box
      component="div"
      sx={{
        overflowY: "auto",
        height: "calc(100vh - 25vh)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "start",
        alignItems: "baseline",
      }}
      onScroll={handleProjectLoading}
    >
      {projects.length > 0 ? (
        projects.map(
          ({
            name,
            id,
            tasksCount,
            currentProgress,
            contributors,
            description,
            createdAt,
            completedTasks,
          }) => {
            return (
              <Card
                key={id}
                className="appear"
                sx={{
                  m: 2,
                  minWidth: 250,
                  flexBasis: 300,
                  flexGrow: 1,
                  height: 220,
                  maxWidth: projects.length === 1 ? 250 : 500,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                elevation={1}
              >
                <Box m={1.8}>
                  <Typography
                    variant="body1"
                    fontWeight={700}
                    sx={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      cursor: "pointer",
                      "&:hover": {
                        color: "Highlight",
                        textDecoration: "underline",
                      },
                    }}
                    onClick={() =>
                      navigate(routes.projects.path.concat(id.toString()))
                    }
                  >
                    {name}
                  </Typography>
                  <Typography variant="caption">
                    <Box component="span" fontWeight={900} fontSize={12.5}>
                      {tasksCount}
                    </Box>
                    &nbsp; Total tasks, &nbsp;
                    <Box component="span" fontWeight={900} fontSize={12.5}>
                      {completedTasks}
                    </Box>
                    &nbsp; Tasks completed
                  </Typography>
                  <Typography
                    component="div"
                    variant="caption"
                    color="GrayText"
                    dangerouslySetInnerHTML={{
                      __html: more[id]
                        ? description.slice(0, 130).concat("...")
                        : description,
                    }}
                    sx={{
                      height: 70,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "normal",
                    }}
                  />
                  <LinearProgressWithLabel
                    color="info"
                    value={currentProgress ?? 0}
                    sx={{ borderRadius: 10 }}
                  />
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1,
                    paddingInline: 1.8,
                  }}
                >
                  <Tooltip
                    title="Contributors"
                    arrow
                    placement="right"
                    disableInteractive
                  >
                    <AvatarGroup
                      total={contributors?.length}
                      max={4}
                      variant="circular"
                      componentsProps={{
                        additionalAvatar: {
                          sx: {
                            width: 24,
                            height: 24,
                            fontSize: 15,
                            background: getColor(),
                            color: "white",
                          },
                        },
                      }}
                    >
                      {contributors?.map((profile, index) => (
                        <AvatarComponent
                          key={profile.id}
                          {...profile}
                          color={getColor(index)}
                          width={24}
                          height={24}
                        />
                      ))}
                    </AvatarGroup>
                  </Tooltip>
                  <Tooltip
                    title="CreatedAt"
                    arrow
                    placement="left"
                    disableInteractive
                  >
                    <Box display="flex" alignItems="center">
                      <CalendarMonth fontSize="small" />
                      <Typography variant="caption">
                        {new Date(createdAt).toDateString()}
                      </Typography>
                    </Box>
                  </Tooltip>
                </Box>
              </Card>
            );
          },
        )
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

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number },
) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2" color="text.secondary" fontWeight={600}>
          Progress
        </Typography>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
      <Box sx={{ width: "100%", mt: 0.5 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{ borderRadius: 5 }}
        />
      </Box>
    </Box>
  );
}

const getColor = (index?: number) => {
  const currentColor = index
    ? Object.values(labelColors).at(index)
    : "51, 171, 5";

  return `rgb(${currentColor})`;
};
