import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#79B473",
      dark: "#5f9659",
      contrastText: "#33332f",
    },
    secondary: {
      main: "#41658A",
      dark: "#2f4a66",
      contrastText: "#f6f3e8",
    },
    background: {
      default: "#a6a294",
      paper: "#e6e1cf",
    },
    text: {
      primary: "#33332f",
      secondary: "#4C3957",
    },
    divider: "#33332f",
    error: {
      main: "#bf2626",
    },
  },
  typography: {
    fontFamily: '"JetBrains Mono", monospace',
    h3: {
      fontWeight: 700,
      letterSpacing: "0.04em",
    },
    h4: {
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
      letterSpacing: "0.04em",
    },
  },
  shape: {
    borderRadius: 18,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            "radial-gradient(circle at top, rgba(121, 180, 115, 0.4), transparent 32%), linear-gradient(180deg, #b8b39f 0%, #a6a294 100%)",
        },
        a: {
          color: "#41658A",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;
