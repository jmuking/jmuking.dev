import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { colors, strings } from "../configs/default";
import styled from "styled-components";
import TabButton from "./TabButton";

import menuPng from "../resources/menu.png";
import menuOpenPng from "../resources/menu-open.png";

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
];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [isTinyMobile, setIsTinyMobile] = useState(window.innerWidth <= 450);

  //600,4
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth <= 600);
      setIsTinyMobile(window.innerWidth <= 450);
    });
  }, []);

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
                  try {
                    navigator.vibrate(10);
                  } catch {
                    /*do nothing*/
                  }
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
                  try {
                    navigator.vibrate(10);
                  } catch {
                    /*do nothing*/
                  }
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
        <img
          src={menuOpen ? menuOpenPng : menuPng}
          alt="menu"
          onClick={() => {
            try {
              navigator.vibrate(10);
            } catch {
              /*do nothing*/
            }
            setMenuOpen(!menuOpen);
          }}
        ></img>
      );
    else return "";
  };

  const renderTitle = () => {
    if (isTinyMobile) return <Title>{strings.title}</Title>;
    else return <Title>{strings.title} &#127918; &#128039; &#128692;</Title>;
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
