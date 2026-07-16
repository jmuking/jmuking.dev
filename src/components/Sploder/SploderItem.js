import { Box } from "@mui/material";
import { colors } from "../../configs/default";

const COLOR_MAPPINGS = [
  colors.other2,
  colors.invalid,
  colors.light,
  colors.tertiary,
  colors.invalidBg,
  colors.primary,
  colors.gold,
];

function SploderItem({ x, y, itemType, onClick }) {
  return (
    <Box
      sx={{
        backgroundColor: COLOR_MAPPINGS[itemType],
        width: "100%",
        height: "100%",
        aspectRatio: "1 / 1",
        cursor: itemType === 0 ? "pointer" : "default",
      }}
      onClick={onClick}
    />
  );
}

export default SploderItem;
