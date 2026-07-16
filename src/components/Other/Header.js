import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  AppBar,
  Box,
  Collapse,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { strings, headerTabs } from "../../configs/default";
import TabButton from "../Other/TabButton";

function Header({ isMobile, isTinyMobile }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const titleEmojis = `${String.fromCodePoint(0x1f3ae)} ${String.fromCodePoint(0x1f427)} ${String.fromCodePoint(0x1f6b4)}`;

  const title = isTinyMobile
    ? strings.title
    : `${strings.title} ${titleEmojis}`;

  return (
    <Box sx={{ width: "100%", position: "sticky", top: 0, zIndex: 10 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "primary.main",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
          boxShadow: "0 10px 24px rgba(51, 51, 47, 0.18)",
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 2, sm: 3, md: 4 },
            py: 1,
            minHeight: "unset",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h1"
              sx={{ lineHeight: 1.1, wordBreak: "break-word" }}
            >
              {title}
            </Typography>
          </Box>
          {isMobile ? (
            <IconButton
              onClick={() => {
                setMenuOpen((current) => !current);
              }}
              aria-label="Toggle navigation"
              sx={{ color: "text.primary" }}
            >
              {menuOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
            </IconButton>
          ) : null}
        </Toolbar>

        {!isMobile ? (
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              px: 4,
              pb: 1,
              flexWrap: "wrap",
              justifyContent: "flex-start",
              alignItems: "flex-end",
            }}
          >
            {headerTabs.map((headerTab) => (
              <TabButton
                key={headerTab[1]}
                text={headerTab[0]}
                active={location.pathname === headerTab[1]}
                onClick={() => {
                  navigate(headerTab[1]);
                }}
              />
            ))}
          </Stack>
        ) : null}
      </AppBar>

      {isMobile ? (
        <Collapse in={menuOpen} timeout="auto" unmountOnExit>
          <Stack
            spacing={1}
            sx={{
              p: 2,
              bgcolor: "background.paper",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            {headerTabs.map((headerTab) => (
              <TabButton
                key={headerTab[1]}
                text={headerTab[0]}
                isMobile={isMobile}
                active={location.pathname === headerTab[1]}
                onClick={() => {
                  setMenuOpen(false);
                  navigate(headerTab[1]);
                }}
              />
            ))}
          </Stack>
        </Collapse>
      ) : null}
    </Box>
  );
}

export default Header;
