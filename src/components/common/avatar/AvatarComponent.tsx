import { Avatar, Tooltip } from "@mui/material";
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
  return (
    <Tooltip
      arrow
      title={profile ? <MemberProfileCardComponent {...rest} /> : undefined}
    >
      <Avatar sx={{ ...sx, width, height }}>{rest.username?.charAt(0)}</Avatar>
    </Tooltip>
  );
};

export default AvatarComponent;