import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Jam from "./components/Jam";
import { Routes, Route } from "react-router-dom";
import { colors } from "./configs/default";
import styled from "styled-components";

const AppContainer = styled.div`
  color: ${colors.dark};
  background-color: ${colors.light};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0;
  height: 100%;
  width: 100%;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: min(50%, 1000px);
  margin-top: 2rem;
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
            <Route path="/jam" element={<Jam></Jam>}></Route>
          </Routes>
        </ContentContainer>
        <Footer></Footer>
      </AppContainer>
    </>
  );
}

export default App;
