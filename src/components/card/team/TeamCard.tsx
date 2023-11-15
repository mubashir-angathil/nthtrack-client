import { Avatar, Card, Typography } from "@mui/material";
import React from "react";

const TeamCard: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
}> = ({ children, ...reset }) => {
  return (
    <Card
      className="btn"
      component="aside"
      {...reset}
      sx={{
        border: 1,
        p: 1,
        borderRadius: 2,
        maxWidth: 180,
        display: "flex",
        gap: 1,
      }}
    >
      <Avatar title="2" sx={{ width: 24, height: 24 }} />
      <Typography textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
        {children}
      </Typography>
    </Card>
  );
};

export default TeamCard;
