import { Avatar, Tooltip, colors } from "@mui/material";
import { FC } from "react";
import MemberProfileCardComponent from "../card/MemberProfileCardComponent";
import { AvatarComponentProps } from "./Helper";

const AvatarComponent: FC<AvatarComponentProps> = ({
  profile = false,
  sx,
  height = 24,
  width = 24,
  ...rest
}) => {
  const COLORS = [
    colors.amber[800],
    colors.cyan[400],
    colors.yellow[900],
    colors.blue[700],
    colors.orange[900],
    colors.green[700],
  ];
  return (
    <Tooltip
      arrow
      title={profile ? <MemberProfileCardComponent {...rest} /> : undefined}
    >
      <Avatar
        sx={{
          ...sx,
          width,
          height,
          background: COLORS[Math.ceil(Math.random() * 5)],
        }}
      >
        {rest.username?.charAt(0)}
      </Avatar>
    </Tooltip>
  );
};

export default AvatarComponent;
