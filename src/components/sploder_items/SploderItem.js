import { sploder } from "../../configs/default";
import styled from "styled-components";

const SploderCell = styled.td`
  padding: 2rem;
  width: 1rem;
  height: 1rem;
`;

function SploderItem({ x, y, itemType, onClick }) {
  return (
    <SploderCell
      style={{ backgroundColor: sploder.colorMappings[itemType] }}
      onClick={onClick}
    ></SploderCell>
  );
}

export default SploderItem;
