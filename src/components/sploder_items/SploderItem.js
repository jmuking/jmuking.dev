import { colors, sploder } from "../../configs/default";
import styled from "styled-components";

const COLOR_MAPPINGS = [
  colors.other2,
  colors.invalid,
  colors.light,
  colors.tertiary,
  colors.invalidBg,
  colors.primary,
  colors.gold,
];

const SploderCell = styled.td``;

function SploderItem({ x, y, itemType, onClick }) {
  return (
    <SploderCell
      style={{ backgroundColor: COLOR_MAPPINGS[itemType] }}
      onClick={onClick}
    ></SploderCell>
  );
}

export default SploderItem;
