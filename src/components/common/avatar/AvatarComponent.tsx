import { Avatar } from "@mui/material";
import { FC, useState } from "react";
import MemberProfileCardComponent from "../card/MemberProfileCardComponent";
import { AvatarComponentProps } from "./Helper";

const AvatarComponent: FC<AvatarComponentProps> = ({
  profile = false,
  sx,
  height = 24,
  width = 24,
  color,
  fontColor,
  border,
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Avatar
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          ...sx,
          width,
          height,
          color: fontColor ?? "#ffff",
          backgroundColor: color,
          cursor: profile ? "default" : "auto",
        }}
        src={rest?.picture}
        style={{ border }}
      >
        {rest.username?.charAt(0)}
      </Avatar>

      {isHovered && profile && <MemberProfileCardComponent {...rest} />}
    </>
  );
};

export default AvatarComponent;
