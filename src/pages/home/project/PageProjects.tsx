import React from "react";
import { Grid, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ProjectCardComponent from "../../../components/card/project-card/ProjectCardComponent";
import { useModalContext } from "../../../utils/helpers/context/modal-context/ModalContext";
import ManageProjectForm from "../../../components/form/manage-project/ManageProjectForm";
import SearchIcon from "@mui/icons-material/Search";

const PageProjects: React.FC = () => {
  const { setModal } = useModalContext();

  return (
    <Grid container gap={2}>
      <Grid item xs={12} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          onClick={() =>
            setModal({
              open: true,
              title: "New Project",
              body: <ManageProjectForm />,
              negativeButton: "Close",
              positiveButton: "Create Project",
            })
          }
        >
          Create Project
        </Button>
        <TextField
          variant="outlined"
          type="search"
          size="small"
          placeholder="Search project here.."
          InputProps={{
            endAdornment: <SearchIcon fontSize="small" />,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <ProjectCardComponent
          projects={[
            {
              projectTitle: "Admin Dashboard",
              description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque vel libero ut lacus rutrum viverra. Mauris
              cursus, dui vitae vestibulum feugiat, velit metus ullamcorper
              ex`,
              numberOfIssues: 4,
              status: "opened",
            },
            {
              projectTitle: "Encusta",
              description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque vel libero ut lacus rutrum viverra. Mauris
              cursus, dui vitae vestibulum feugiat, velit metus ullamcorper
              ex`,
              numberOfIssues: 4,
              status: "opened",
            },
            {
              projectTitle: "Alumni WMOC",
              description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque vel libero ut lacus rutrum viverra. Mauris
              cursus, dui vitae vestibulum feugiat, velit metus ullamcorper
              ex`,
              numberOfIssues: 4,
              status: "opened",
            },
            {
              projectTitle: "FMS",
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
