import "./App.css";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseFullscreenRoundedIcon from "@mui/icons-material/CloseFullscreenRounded";
import CodeOffRoundedIcon from "@mui/icons-material/CodeOffRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import OpenInFullRoundedIcon from "@mui/icons-material/OpenInFullRounded";
import React, { useEffect, useState } from "react";
import About from "./components/About";
import Chill from "./components/Chill";
import Contact from "./components/Contact";
import Home from "./components/Home";
import CodeContainer from "./components/Other/CodeContainer";
import Footer from "./components/Other/Footer";
import Header from "./components/Other/Header";
import Penguins from "./components/Penguins";
import Play from "./components/Play";
import Sploder from "./components/Sploder";
import { headerTabs } from "./configs/default";

function App() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [codeSpy, setCodeSpy] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTinyMobile = useMediaQuery("(max-width:490px)");

  useEffect(() => {
    if (isMobile) {
      setExpanded(true);
      setCodeSpy(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const validRoutes = headerTabs.map((headerTab) => {
      return headerTab[1];
    });
    if (!validRoutes.includes(location.pathname)) navigate("/");
  }, [location, navigate]);

  const maxWidth = isMobile
    ? "100%"
    : expanded
      ? "calc(100% - 2rem)"
      : codeSpy
        ? "94%"
        : "56rem";

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        color: "text.primary",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Header isMobile={isMobile} isTinyMobile={isTinyMobile} />
        <Container
          maxWidth={false}
          sx={{
            py: { xs: 0, md: 2 },
            px: { xs: 0, md: 2 },
            display: "flex",
            justifyContent: "center",
            width: "100%",
            minHeight: 0,
            flexGrow: 1,
            overflow: "hidden",
          }}
        >
          <Paper
            elevation={8}
            sx={{
              width: "100%",
              maxWidth,
              display: "flex",
              minHeight: 0,
              overflow: "hidden",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 0,
              transition: theme.transitions.create(
                ["max-width", "box-shadow"],
                {
                  duration: theme.transitions.duration.standard,
                  easing: theme.transitions.easing.easeInOut,
                },
              ),
              willChange: "max-width",
            }}
          >
            {!isMobile && (
              <Stack
                spacing={2}
                sx={{
                  p: 1.5,
                  bgcolor: "text.primary",
                  borderRight: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Tooltip
                  title={codeSpy ? "Hide code panel" : "Show code panel"}
                >
                  <IconButton
                    onClick={() => {
                      setCodeSpy((current) => !current);
                    }}
                    sx={{
                      color: codeSpy ? "primary.main" : "common.white",
                      bgcolor: codeSpy
                        ? "rgba(121, 180, 115, 0.18)"
                        : "transparent",
                    }}
                  >
                    {codeSpy ? <CodeOffRoundedIcon /> : <CodeRoundedIcon />}
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={expanded ? "Constrain layout" : "Expand layout"}
                >
                  <IconButton
                    onClick={() => {
                      setExpanded((current) => !current);
                    }}
                    sx={{
                      color: expanded ? "primary.main" : "common.white",
                      bgcolor: expanded
                        ? "rgba(121, 180, 115, 0.18)"
                        : "transparent",
                    }}
                  >
                    {expanded ? (
                      <CloseFullscreenRoundedIcon />
                    ) : (
                      <OpenInFullRoundedIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </Stack>
            )}

            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                minWidth: 0,
                minHeight: 0,
                overflow: "hidden",
              }}
            >
              <Box
                component="main"
                sx={{
                  flex: 1,
                  minWidth: 0,
                  minHeight: 0,
                  p: { xs: 2, sm: 3, md: 4 },
                  bgcolor: "background.paper",
                  overflowY: "auto",
                  overflowX: "hidden",
                  transition: theme.transitions.create(["padding"], {
                    duration: theme.transitions.duration.standard,
                    easing: theme.transitions.easing.easeInOut,
                  }),
                }}
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/chill" element={<Chill />} />
                  <Route path="/play" element={<Play />} />
                  <Route path="/penguins" element={<Penguins />} />
                  <Route path="/sploder" element={<Sploder />} />
                </Routes>
              </Box>
              {!isMobile && (
                <Box
                  sx={{
                    width: codeSpy ? "min(42rem, 42vw)" : 0,
                    minHeight: 0,
                    opacity: codeSpy ? 1 : 0,
                    overflow: "auto",
                    borderLeft: codeSpy ? "1px solid" : "0 solid",
                    borderColor: "divider",
                    transition: theme.transitions.create(
                      ["width", "opacity", "border-left-width"],
                      {
                        duration: theme.transitions.duration.standard,
                        easing: theme.transitions.easing.easeInOut,
                      },
                    ),
                  }}
                >
                  <CodeContainer />
                </Box>
              )}
            </Box>
          </Paper>
        </Container>
        <Box sx={{ mt: "auto", width: "100%" }}>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
