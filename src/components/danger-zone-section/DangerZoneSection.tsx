import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useDangerZoneSection } from "./Helper";

const DangerZoneSection: React.FC = () => {
  const { dangerZoneItems } = useDangerZoneSection();
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
        {dangerZoneItems?.map((item, index) => {
          return (
            <Box key={index}>
              {/* Danger Zone Item Title and Action Button */}
              <Box padding={2} display="flex" justifyContent="space-between">
                {item.title}
                <Button variant="outlined" color="error" onClick={item.handler}>
                  {item.button}
                </Button>
              </Box>

              {/* Divider except for the last item */}
              {item.button !== "Delete project" &&
                dangerZoneItems.length > 1 && <Divider />}
            </Box>
          );
        })}
      </Stack>
    </>
  );
};

export default DangerZoneSection;
