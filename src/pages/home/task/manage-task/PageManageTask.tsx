import { Grid } from "@mui/material";
import React from "react";
import { ManageTaskProps, useUpdateTask } from "./Helper";
import ManageTaskForm from "../../../../components/form/manage-task/ManageTaskForm";

const PageManageTask: React.FC<ManageTaskProps> = ({ type }) => {
  const { task } = useUpdateTask({ type });

  return (
    <Grid container>
      <Grid item xs={12}>
        <ManageTaskForm values={type === "update" ? task : undefined} />
      </Grid>
    </Grid>
  );
};

export default PageManageTask;
