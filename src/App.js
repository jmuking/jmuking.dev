import "./App.css";

import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Chill from "./components/Chill";
import Play from "./components/Play";
import { Routes, Route } from "react-router-dom";
import { colors } from "./configs/default";
import styled from "styled-components";
import Contact from "./components/Contact";

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
  height: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  max-width: 50rem;
  overflow-y: auto;
  overflow-x: hidden;
`;

function App() {
  return (
    <>
      <AppContainer>
        <Header></Header>
        <ContentContainer>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/about" element={<About></About>}></Route>
            <Route path="/contact" element={<Contact></Contact>}></Route>
            <Route path="/chill" element={<Chill></Chill>}></Route>
            <Route path="/play" element={<Play></Play>}></Route>
          </Routes>
        </ContentContainer>
        <Footer></Footer>
      </AppContainer>
    </>
  );
}

export default App;
