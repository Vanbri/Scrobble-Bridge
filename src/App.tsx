import { useState } from "react";
import { Toolbar, Typography, Box, Tabs, Tab, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import HistoryImporter from "./pages/History-Importer";
import JsonToCsv from "./pages/JsonToCsv";

export default function App() {
  const [tabValue, setTabValue] = useState("1");
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} textColor="inherit">
            <Tab label="History Importer" value="1" />
            <Tab label="History To CSV" value="2" />
          </Tabs>
        </Box>
        <Typography variant="h5">Scrobble Bridge</Typography>
        <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
      <Box sx={{ p: 3 }}>
        {tabValue === "1" && <HistoryImporter />}
        {tabValue === "2" && <JsonToCsv />}
      </Box>
    </ThemeProvider>
  );
}
