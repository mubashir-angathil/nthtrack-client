import { Box, Typography } from "@mui/material";
import { FC } from "react";
import AvatarComponent from "../avatar/AvatarComponent";
import { MemberProfile } from "./Helper";

const MemberProfileCardComponent: FC<MemberProfile> = (props) => {
  return (
    <Box
      component="span"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
    >
      <AvatarComponent {...props} height={30} width={30} />
      <Typography>{props.username}</Typography>
      <Typography>{props.email}</Typography>
    </Box>
  );
};

export default MemberProfileCardComponent;
