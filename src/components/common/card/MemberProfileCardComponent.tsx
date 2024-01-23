import { Box, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import AvatarComponent from "../avatar/AvatarComponent";
import { MemberProfile } from "./Helper";
import { styles } from "./Style";

const MemberProfileCardComponent: FC<MemberProfile> = (props) => {
  const theme = useTheme();
  return (
    <Box component="span" sx={styles.cardWrapper} className="profile">
      <AvatarComponent
        {...props}
        height={100}
        width={100}
        sx={styles.avatar}
        border={`3px solid ${
          theme.palette.mode === "dark" ? "white" : "black"
        }`}
        color="background.paper"
        fontColor="inherit"
      />
      <Box sx={styles.detailSectionWrapper} component="div">
        <Typography fontSize="1.4rem" fontWeight={600} pt={1}>
          {props.username}
        </Typography>
        <Typography fontSize="0.8rem">{props.email}</Typography>
      </Box>
    </Box>
  );
};

export default MemberProfileCardComponent;
