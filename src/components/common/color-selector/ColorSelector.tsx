// ColorSelector: A functional component for selecting and displaying label colors.

import { CheckCircle, CircleOutlined } from "@mui/icons-material";
import { Box, ButtonGroup, FormHelperText } from "@mui/material";
import { labelColors } from "../../../utils/helpers/configs/Colors";
import { ColorSelectorProps } from "./Helper";

// Functional component for rendering the color selector
const ColorSelector: React.FC<ColorSelectorProps> = ({
  activeColor,
  onColorSelect,
}) => {
  // Function to handle color selection
  const handleColorSelect = (color: string) => {
    onColorSelect(color);
  };

  return (
    <>
      {/* Form helper text for color selection */}
      <FormHelperText>Color</FormHelperText>
      {/* Button group for displaying color options */}
      <ButtonGroup sx={{ gap: 1 }}>
        {/* Map through each color and create a button for selection */}
        {Object.entries(labelColors).map(([key, color]) => (
          <Box
            key={key}
            onClick={() => handleColorSelect(color)}
            sx={{
              cursor: "pointer",
              backgroundColor:
                activeColor !== color
                  ? `rgba(${color},0.1)`
                  : `rgba(${color},1)`,
              borderRadius: 1,
              height: 30,
              width: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Display check mark for active color, otherwise display outlined circle */}
            {activeColor === color ? (
              <CheckCircle fontSize="small" />
            ) : (
              <CircleOutlined
                fontSize="small"
                sx={{ color: `rgba(${color},1)` }}
              />
            )}
          </Box>
        ))}
      </ButtonGroup>
    </>
  );
};

export default ColorSelector;
