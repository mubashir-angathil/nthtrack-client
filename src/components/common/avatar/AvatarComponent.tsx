import { Avatar, Popover } from "@mui/material";
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
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Avatar
        sx={{
          ...sx,
          width,
          height,
          color: fontColor ?? "#ffff",
          backgroundColor: color,
          cursor: profile ? "pointer" : "auto",
        }}
        onMouseOverCapture={profile ? handleClick : undefined}
        onClick={profile ? handleClose : undefined}
        src={rest?.picture}
        style={{ border }}
      >
        {rest.username?.charAt(0)}
      </Avatar>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            style: {
              borderRadius: 20,
            },
          },
        }}
      >
        <MemberProfileCardComponent {...rest} />
      </Popover>
    </>
  );
};

export default AvatarComponent;
