import { useNavigate, useLocation } from "react-router-dom";
import { colors, strings } from "../configs/default";
import styled from "styled-components";
import TabButton from "./TabButton";

const Title = styled.h1`
  color: ${colors.dark};
  background-color: ${colors.primary};
  padding-left: 2rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: left;
  margin-bottom: 0;
  margin-top: 0;
  padding-top: 1rem;
  padding-bottom: 2rem;
  box-shadow: 1px 1px 5px 2px ${colors.dark};
`;

const Navigator = styled.div`
  display: flex;
  justify-content: left;
  height: 4rem;
  margin-left: 2rem;
`;

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Title>{strings.title} &#127918; &#128039; &#128692;</Title>
      <Navigator>
        <TabButton
          text="Home"
          active={location.pathname === "/"}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </TabButton>
        <TabButton
          text="About"
          active={location.pathname === "/about"}
          onClick={() => {
            navigate("/about");
          }}
        >
          About
        </TabButton>
        <TabButton
          text="Jam"
          active={location.pathname === "/jam"}
          onClick={() => {
            navigate("/jam");
          }}
        >
          Jam
        </TabButton>
      </Navigator>
    </div>
  );
}

export default Header;
