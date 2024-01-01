import { FC } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useManageProjectSettings } from "./Helper";
import { Box, Button, Divider, Typography } from "@mui/material";
import ProjectMemberTableComponent from "../../../../components/table/project-member-table/ProjectMemberTableComponent";
import { Stack } from "@mui/system";
import ProjectLabelTableComponent from "../../../../components/table/project-label-table/ProjectLabelTableComponent";

const PageProjectSettings: FC = () => {
  const { dangerZoneItems, tab, handleTabChange } = useManageProjectSettings();

  const DangerZoneSection = () => {
    return (
      <>
        {/* Danger Zone Section */}
        <Typography variant="h4" pb={2}>
          Danger Zone
        </Typography>
        {/* Stack for Danger Zone Items */}
        <Stack
          border={1}
          borderColor="red"
          borderRadius={2}
          display="flex"
          justifyContent="space-between"
        >
          {/* Mapping and rendering each Danger Zone Item */}
          {dangerZoneItems.map((item, index) => {
            return (
              <Box key={index}>
                {/* Conditional rendering based on the condition */}
                {item?.condition ? (
                  <>
                    {/* Danger Zone Item Title and Action Button */}
                    <Box
                      padding={2}
                      display="flex"
                      justifyContent="space-between"
                    >
                      {item.title}
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={item.handler}
                      >
                        {item.button}
                      </Button>
                    </Box>

                    {/* Divider except for the last item */}
                    {item.button !== "Delete project" && <Divider />}
                  </>
                ) : (
                  <></>
                )}
              </Box>
            );
          })}
        </Stack>
      </>
    );
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Members" value="1" />
            <Tab label="Labels" value="2" />
            <Tab label="Statuses" value="3" />
            <Tab label="Danger Zone" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ProjectMemberTableComponent />
        </TabPanel>
        <TabPanel value="2">
          <ProjectLabelTableComponent />
        </TabPanel>
        <TabPanel value="3">
          <ProjectLabelTableComponent />
        </TabPanel>
        <TabPanel value="4">
          <DangerZoneSection />
        </TabPanel>
      </TabContext>
    </Box>
  );
};
export default PageProjectSettings;
