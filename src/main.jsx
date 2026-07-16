import "@fontsource/jetbrains-mono";
import React from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import theme from "./theme";

async function loadNetlifyEnv() {
  if (typeof window === "undefined" || window.__NETLIFY_ENV__) {
    return;
  }

  try {
    const response = await fetch("/.netlify/functions/client-env");
    if (!response.ok) {
      return;
    }

    window.__NETLIFY_ENV__ = await response.json();
  } catch {
    window.__NETLIFY_ENV__ = {};
  }
}

await loadNetlifyEnv();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
