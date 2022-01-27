import { colors, sploder } from "../../configs/default";
import styled from "styled-components";

const COLOR_MAPPINGS = [
  colors.other2,
  colors.primary,
  colors.dark,
  colors.tertiary,
  colors.secondary,
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
