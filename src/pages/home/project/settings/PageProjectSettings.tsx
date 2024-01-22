import { FC, Suspense } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useManageProjectSettings } from "./Helper";
import { Box } from "@mui/material";

const PageProjectSettings: FC = () => {
  const { panels, tab, handleTabChange } = useManageProjectSettings();

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            {// Tabs
            panels?.map((panel, index) => (
              <Tab key={index} label={panel.label} value={index.toString()} />
            ))}
          </TabList>
        </Box>

        {// Tab panels
        panels?.map((panel, index) => (
          <TabPanel key={index} value={index.toString()} sx={{ p: 1 }}>
            <Suspense fallback={<>Loading...</>}>{panel.component}</Suspense>
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};
export default PageProjectSettings;
