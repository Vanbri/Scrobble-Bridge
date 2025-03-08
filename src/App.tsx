import { useState } from "react";
import { Toolbar, Typography, Box, Tabs, Tab, IconButton } from "@mui/material";
import { Brightness4, Brightness7, CloudDownload, CloudUpload, CloudSync } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { UploadPage } from "./pages/Upload-Page";
import { ConvertPage } from "./pages/Convert-Page";
import ManagePage from "./pages/Manage-Page";

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
      <Toolbar
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
        }} >
        <Box sx={{ justifySelf: "start" }}>
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            textColor="inherit" >
            <Tab icon={<CloudUpload />} iconPosition="start" label="Upload" value="1" />
            <Tab icon={<CloudDownload />} iconPosition="start" label="Convert" value="2" />
            <Tab icon={<CloudSync />} iconPosition="start" label="Manage" value="3" />
          </Tabs>
        </Box>
        <Typography variant="h5" sx={{ justifySelf: "center" }}>
          Scrobble Bridge
        </Typography>
        <Box sx={{ justifySelf: "end" }}>
          <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
      <Box sx={{ p: 3 }}>
        {tabValue === "1" && <UploadPage />}
        {tabValue === "2" && <ConvertPage />}
        {tabValue === "3" && <ManagePage />}
      </Box>
    </ThemeProvider>
  );
}
