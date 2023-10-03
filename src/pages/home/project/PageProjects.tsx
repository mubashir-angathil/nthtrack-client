import React from "react";
import { Grid, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ProjectCardComponent from "../../../components/card/project-card/ProjectCardComponent";

const PageProjects: React.FC = () => {
  return (
    <Grid container gap={2}>
      <Grid item xs={12} display="flex" justifyContent="space-between">
        <Button variant="contained" endIcon={<AddIcon />}>
          Create Project
        </Button>
        <input type="search" />
      </Grid>
      <Grid xs={12}>
        <ProjectCardComponent
          projects={[
            {
              projectTitle: "ProjectName",
              description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque vel libero ut lacus rutrum viverra. Mauris
              cursus, dui vitae vestibulum feugiat, velit metus ullamcorper
              ex`,
              numberOfIssues: 4,
              status: "opened",
            },
            {
              projectTitle: "ProjectName",
              description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque vel libero ut lacus rutrum viverra. Mauris
              cursus, dui vitae vestibulum feugiat, velit metus ullamcorper
              ex`,
              numberOfIssues: 4,
              status: "opened",
            },
          ]}
        />
      </Grid>
    </Grid>
  );
};

export default PageProjects;
