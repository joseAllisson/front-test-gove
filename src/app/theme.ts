"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  palette: {
    primary: {
      main: "#42a5f5",
      light: "#1976d2",
      dark: "#1565c0",
      contrastText: "#ffffff",
    },
  },
});

export default theme;
