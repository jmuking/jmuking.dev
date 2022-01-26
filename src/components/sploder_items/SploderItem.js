import { sploder } from "../../configs/default";
import styled from "styled-components";

const SploderCell = styled.td``;

function SploderItem({ x, y, itemType, onClick }) {
  return (
    <SploderCell
      style={{ backgroundColor: sploder.colorMappings[itemType] }}
      onClick={onClick}
    ></SploderCell>
  );
}

export default SploderItem;
