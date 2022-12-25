import React from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function ProgressLinear() {
  const theme = createTheme({
    palette: {
      primary: {
        light: "#fcdfd8",
        main: "#c9ada7",
        dark: "#987e78",
        contrastText: "#22223B",
      },
      secondary: {
        light: "#cbbcc9",
        main: "#9a8c98",
        dark: "#6c5f6a",
        contrastText: "#eeeeee",
      },
    },
  });

  // 線條讀取
  return (
    <div className="progress-linear">
      <ThemeProvider theme={theme}>
        <Stack sx={{ width: "80%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="primary" />
        </Stack>
      </ThemeProvider>
    </div>
  );
}
