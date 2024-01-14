import React from "react";
import {
  Card,
  Divider,
  Typography,
  Box,
  AvatarGroup,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { ProjectCardComponentProps, useManageProjectCard } from "./Helper";
import routes from "../../../utils/helpers/routes/Routes";
import noDataImage from "../../../assets/noData.svg";
import { CalendarMonth } from "@mui/icons-material";
import AvatarComponent from "../../common/avatar/AvatarComponent";
import { projectCardStyle } from "./Style";
import generalFunctions from "../../../utils/helpers/functions/GeneralFunctions";
import LinearProgressWithLabel from "../../common/linear-progress/LinearProgressWithLabel";

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
  const matches = useMediaQuery("(min-width:600px)");
  const style = projectCardStyle;

  return (
    <Box
      component="div"
      sx={style.projectCardWrapper}
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
                  ...style.cardStyle,
                  maxWidth: projects.length === 1 && matches ? 250 : 520,
                }}
                elevation={1}
              >
                <Box m={1.8}>
                  <Typography
                    variant="body1"
                    fontWeight={700}
                    sx={style.projectTitle}
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
                    sx={style.description}
                  />
                  <LinearProgressWithLabel
                    color="info"
                    value={currentProgress ?? 0}
                    sx={{ borderRadius: 10 }}
                  />
                </Box>
                <Divider />
                <Box sx={style.footerWrapper}>
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
                        additionalAvatar: style.additionalAvatarStyle,
                      }}
                    >
                      {contributors?.map((profile, index) => (
                        <AvatarComponent
                          key={profile.id}
                          {...profile}
                          color={generalFunctions.getColor(index)}
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
          height="calc(100dvh - 25dvh)"
          width="100%"
        >
          <Box
            component="img"
            style={{ maxHeight: 200, aspectRatio: "5/2" }}
            src={noDataImage}
          />
          <Typography margin={0} variant="body1" color="GrayText">
            No Projects
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProjectCardComponent;
