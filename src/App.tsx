import { useState } from "react";
import { Toolbar, Typography, Box, Tabs, Tab, IconButton } from "@mui/material";
import { Brightness4, Brightness7, CloudDownload, CloudUpload, CloudSync } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import HistoryImporter from "./pages/Upload-Page";
import JsonToCsv from "./pages/Convert-Page";

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
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} textColor="inherit">
          <Tab icon={<CloudUpload />} iconPosition="start" label="Upload" value="1" />
          <Tab icon={<CloudDownload />} iconPosition="start" label="Convert" value="2" />
          <Tab icon={<CloudSync />} iconPosition="start" label="Manage" value="3" />
        </Tabs>
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
