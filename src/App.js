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
  max-width: 50rem;
  overflow: auto;
  padding: 2rem;
`;

const ParentContentContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
`;

function App() {
  const [codeSpy, setCodeSpy] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [isTinyMobile, setIsTinyMobile] = useState(window.innerWidth <= 450);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth <= 900);
      setIsTinyMobile(window.innerWidth <= 490);
    });
  }, []);

  return (
    <>
      <AppContainer>
        <Header
          onToggleCodeSpy={() => {
            setCodeSpy(!codeSpy);
          }}
          isMobile={isMobile}
          isTinyMobile={isTinyMobile}
        ></Header>
        <ParentContentContainer
          style={{
            justifyContent: codeSpy ? "space-between" : "center",
            marginTop: isMobile ? 0 : "1rem",
          }}
        >
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
        </ParentContentContainer>
        <Footer></Footer>
      </AppContainer>
    </>
  );
}

export default App;
