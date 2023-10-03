import {
  Card,
  Button,
  Grid,
  Typography,
  Stack,
  Box,
  colors,
  List,
  ListItem,
  ListItemButton,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { FC } from "react";
import PluseIcon from "@mui/icons-material/Add";
import { issues } from "./Helper";

const PageViewProject: FC = () => {
  return (
    <Grid container gap={2}>
      <Grid item xs={12} display="flex" justifyContent="space-between" mt={2}>
        <Typography variant="h4">Project name</Typography>
        <Box component="div" display="flex" gap={2}>
          <Button variant="contained" color="error">
            Close Project
          </Button>
          <Button variant="contained" startIcon={<PluseIcon />}>
            Create Issue
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" color="GrayText">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          vel libero ut lacus rutrum viverra. Mauris cursus, dui vitae
          vestibulum feugiat, velit metus ullamcorper ex
        </Typography>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="end" gap={2}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="demo-simple-select-disabled">Tracker</InputLabel>
          <Select
            labelId="demo-simple-select-disabled-label"
            id="demo-simple-select-disabled"
            value={0}
            label="Age"
            size="small"
            onChange={() => {}}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="demo-simple-select-disabled">Status</InputLabel>
          <Select
            labelId="demo-simple-select-disabled-label"
            id="demo-simple-select-disabled"
            value={0}
            label="Age"
            size="small"
            onChange={() => {}}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Opened"}>Opened</MenuItem>
            <MenuItem value={"Closed"}>Closed</MenuItem>
          </Select>
        </FormControl>
        <TextField
          size="small"
          type="search"
          placeholder="Search issues here ..."
        />
      </Grid>
      <Grid item xs={12}>
        {issues.map(({ id, title, status, description, createdAt }) => {
          const issueStatus = status === "opened";
          return (
            <Card
              key={id}
              elevation={0}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: "1em",
                backgroundColor: "transparent",
                border: 1,
                gap: 1,
                mt: 2,
                borderColor: issueStatus ? colors.red.A200 : colors.blue[500],
              }}
            >
              <Typography>#{id}</Typography>
              <Typography>{title}</Typography>
              <Typography>{status}</Typography>
              <Typography width={350}>{description}</Typography>
              <Typography>{createdAt}</Typography>
              <Button
                variant={issueStatus ? "contained" : "text"}
                size="small"
                sx={{ height: 40 }}
                color={issueStatus ? "error" : "primary"}
                disabled={!issueStatus}
              >
                {issueStatus ? "Close" : "Closed"}
              </Button>
            </Card>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default PageViewProject;
