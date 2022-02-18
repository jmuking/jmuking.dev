import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { colors, strings } from "../../configs/default";
import styled from "styled-components";
import TabButton from "../Other/TabButton";

import menuPng from "../../resources/menu.png";
import menuOpenPng from "../../resources/menu-open.png";
import VibButton from "./VibButton";

const Title = styled.h1`
  color: ${colors.dark};
  background-color: ${colors.primary};
  margin-bottom: 0;
  margin-top: 0;
`;

const HeaderBackground = styled.div`
  color: ${colors.dark};
  background-color: ${colors.primary};
  padding: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 99;
  box-shadow: 0 3px 3px 2px ${colors.dark};
`;

const Navigator = styled.div`
  display: flex;
  justify-content: left;
  height: 4rem;
  margin-left: 2rem;
`;

const MobileNavigator = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  margin-left: 0;
  height: auto;
  width: 100%;
`;

const headerTabs = [
  ["home", "/"],
  ["about", "/about"],
  ["contact", "/contact"],
  ["chill", "/chill"],
  ["play", "/play"],
  ["penguins", "/penguins"],
  ["sploder", "/sploder"],
];

function Header({ isMobile, isTinyMobile }) {
  const navigate = useNavigate();
  const location = useLocation();

  //600,4
  const [menuOpen, setMenuOpen] = useState(false);

  const renderNavigator = () => {
    if (isMobile && menuOpen)
      return (
        <MobileNavigator>
          {headerTabs.map((headerTab, index) => {
            return (
              <TabButton
                key={index}
                text={headerTab[0]}
                isMobile={isMobile}
                active={location.pathname === headerTab[1]}
                onClick={() => {
                  setMenuOpen(!menuOpen);
                  navigate(headerTab[1]);
                }}
              ></TabButton>
            );
          })}
        </MobileNavigator>
      );
    else if (!isMobile)
      return (
        <Navigator>
          {headerTabs.map((headerTab, index) => {
            return (
              <TabButton
                key={index}
                text={headerTab[0]}
                active={location.pathname === headerTab[1]}
                onClick={() => {
                  navigate(headerTab[1]);
                }}
              ></TabButton>
            );
          })}
        </Navigator>
      );
  };

  const renderMenuButton = () => {
    if (isMobile)
      return (
        <VibButton
          src={menuPng}
          toggledSrc={menuOpenPng}
          onToggled={(toggled) => {
            setMenuOpen(toggled);
          }}
          initToggled={menuOpen}
        ></VibButton>
      );
    else return "";
  };

  const renderTitle = () => {
    if (isTinyMobile) return <Title>{strings.title}</Title>;
    else if (isMobile)
      return <Title>{strings.title} &#127918; &#128039; &#128692;</Title>;
    else
      return (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Title>{strings.title} &#127918; &#128039; &#128692;</Title>
        </div>
      );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <HeaderBackground>
        {renderTitle()}
        {renderMenuButton()}
      </HeaderBackground>
      {renderNavigator()}
    </div>
  );
}

export default Header;
