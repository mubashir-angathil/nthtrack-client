import { Grid } from "@mui/material";
import React from "react";
import ManageProjectForm from "../../../../components/form/manage-project/ManageProjectForm";
import { ManageProjectProps, useUpdateProject } from "./Helper";

const PageManageProject: React.FC<ManageProjectProps> = ({ type }) => {
  const { project } = useUpdateProject({ type });
  return (
    <Grid container>
      <Grid item xs={12}>
        <ManageProjectForm values={type === "update" ? project : undefined} />
      </Grid>
    </Grid>
  );
};

export default PageManageProject;
