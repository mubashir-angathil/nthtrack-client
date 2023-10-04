import { FC } from "react";
import { Button, Box, Chip, Grid, Typography } from "@mui/material";

const PageIssueView: FC = () => {
  return (
    <Grid container gap={2} mt={2}>
      <Grid item xs={12} display="flex" justifyContent="space-between">
        <Typography variant="h4">#issue</Typography>
        <Button variant="contained" size="small">
          Close
        </Button>
      </Grid>
      <Grid item xs={12} gap={2}>
        <Typography>
          <Box component="span" color="ActiveBorder">
            Tracker:&nbsp;
          </Box>
          <Chip label="Bug" color="error" />
        </Typography>
        <Typography gutterBottom color="ActiveBorder">
          Description:
        </Typography>
        <Typography>
          Lorem ipsum he was he was work king he was work king he was work king
          he was work king he was work king he was work king work king he was
          work king he was work king
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PageIssueView;
