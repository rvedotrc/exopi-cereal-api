"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { PropsWithChildren } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5e35b1",
    },
    secondary: {
      main: "#f50000",
    },
  },
});

const ClientThemeProvider = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default ClientThemeProvider;
