import { Button } from "@mui/material";
import React from "react";

function TabButton({ active, text, onClick, isMobile }) {
  const desktopStyles = isMobile
    ? {}
    : {
        minHeight: "2.5rem",
        borderWidth: 0,
        borderRadius: 0,
        color: "text.primary",
        bgcolor: "transparent",
        boxShadow: "none",
        borderBottom: "3px solid",
        borderBottomColor: active ? "text.primary" : "transparent",
        fontSize: "0.95rem",
        fontWeight: active ? 700 : 500,
        "&:hover": {
          borderColor: "transparent",
          borderBottomColor: "text.primary",
          bgcolor: "rgba(51, 51, 47, 0.08)",
        },
      };

  return (
    <Button
      onClick={onClick}
      disableElevation
      variant={isMobile ? (active ? "contained" : "outlined") : "text"}
      sx={{
        px: 3,
        textAlign: "center",
        borderWidth: 1,
        minHeight: isMobile ? "3rem" : "2.75rem",
        fontSize: active ? "1rem" : "0.92rem",
        cursor: active ? "auto" : "pointer",
        justifyContent: isMobile ? "flex-start" : "center",
        borderColor: "text.primary",
        color: active ? "text.primary" : "common.white",
        bgcolor: active ? "primary.main" : "text.primary",
        boxShadow: active ? 3 : 0,
        width: isMobile ? "100%" : "auto",
        "&:hover": {
          borderColor: "text.primary",
          bgcolor: active ? "primary.dark" : "secondary.main",
        },
        ...desktopStyles,
      }}
    >
      {text}
    </Button>
  );
}

export default TabButton;
