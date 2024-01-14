import React from "react";
import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from "@mui/material";

// Define a functional component named LinearProgressWithLabel
const LinearProgressWithLabel: React.FC<
  LinearProgressProps & {
    value: number;
  }
> = (props) => {
  // Render the component structure
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* Box to display progress label and percentage */}
      <Box display="flex" justifyContent="space-between">
        {/* Label for the progress */}
        <Typography variant="body2" color="text.secondary" fontWeight={600}>
          Progress
        </Typography>
        {/* Percentage value of the progress */}
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
      {/* Box for the LinearProgress component with full width */}
      <Box sx={{ width: "100%", mt: 0.5 }}>
        {/* LinearProgress component with determinate variant and additional styling */}
        <LinearProgress
          variant="determinate"
          {...props} // Spread other props passed to this component
          sx={{ borderRadius: 5 }} // Apply additional styling using the sx prop
        />
      </Box>
    </Box>
  );
};

// Export the LinearProgressWithLabel component as the default export
export default LinearProgressWithLabel;
