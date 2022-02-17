import "./App.css";

import React, { useEffect, useState } from "react";
import Header from "./components/Other/Header";
import Footer from "./components/Other/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Play from "./components/Play";
import Sploder from "./components/Sploder";
import CodeContainer from "./components/Other/CodeContainer";
import { Routes, Route } from "react-router-dom";
import { colors } from "./configs/default";
import styled from "styled-components";
import Contact from "./components/Contact";
import Penguins from "./components/Penguins";
import Chill from "./components/Chill";
import VibButton from "./components/Other/VibButton";

import expandPng from "./resources/expand.png";
import contractPng from "./resources/contract.png";
import inspectPng from "./resources/inspect.png";
import inspectOpenPng from "./resources/inspect-open.png";

const AppContainer = styled.div`
  color: ${colors.dark};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0;
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 2rem;
  background: ${colors.light};
  z-index: 1;
`;

const ParentContentContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid ${colors.dark};
  border-bottom: 0;
  background: ${colors.light};
`;

function App() {
  const [codeSpy, setCodeSpy] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [expanded, setExpanded] = useState(false);
  const [isTinyMobile, setIsTinyMobile] = useState(window.innerWidth <= 450);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const newIsMobile = window.innerWidth <= 900;
      setIsMobile(newIsMobile);
      setExpanded(newIsMobile);
      setIsTinyMobile(window.innerWidth <= 490);
    });
  }, []);

  return (
    <>
      <AppContainer>
        <Header isMobile={isMobile} isTinyMobile={isTinyMobile}></Header>
        <ParentContentContainer
          style={{
            justifyContent: codeSpy ? "space-between" : "",
            marginTop: isMobile ? 0 : "1rem",
            maxWidth: expanded
              ? "calc(100% - 4rem)"
              : codeSpy
              ? "100rem"
              : "50rem",
          }}
        >
          {!isMobile && (
            <div
              style={{
                display: "flex",
                alignSelf: "end",
                marginRight: "2rem",
                marginTop: "2rem",
              }}
            >
              <VibButton
                src={inspectPng}
                toggledSrc={inspectOpenPng}
                onToggled={setCodeSpy}
                style={{
                  width: "2rem",
                  marginRight: "2rem",
                }}
              ></VibButton>
              <VibButton
                src={expandPng}
                toggledSrc={contractPng}
                onToggled={(toggled) => {
                  setExpanded(toggled);
                }}
                style={{
                  width: "2rem",
                }}
              ></VibButton>
            </div>
          )}

          <div style={{ display: "flex", flexGrow: 1 }}>
            <ContentContainer>
              <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/about" element={<About></About>}></Route>
                <Route path="/contact" element={<Contact></Contact>}></Route>
                <Route path="/chill" element={<Chill></Chill>}></Route>
                <Route path="/play" element={<Play></Play>}></Route>
                <Route path="/penguins" element={<Penguins></Penguins>}></Route>
                <Route path="/sploder" element={<Sploder></Sploder>}></Route>
              </Routes>
            </ContentContainer>
            {codeSpy ? <CodeContainer></CodeContainer> : ""}
          </div>
        </ParentContentContainer>
        <Footer></Footer>
      </AppContainer>
    </>
  );
}

export default App;
