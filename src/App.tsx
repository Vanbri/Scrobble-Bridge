import React, { useState } from "react";
import { Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import HistoryImporter from "./pages/History-Importer";
import JsonToCsv from "./pages/JsonToCsv";

export default function SimpleTabs() {
  const [value, setValue] = useState("1");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <TabList onChange={handleChange} aria-label="tabs">
        <Tab label="History Importer" value="1" />
        <Tab label="History To CSV" value="2" />
        <Tab label="Item Three" value="3" />
        <Tab label="Item Four" value="4" />
      </TabList>
      <TabPanel value="1">
        <HistoryImporter />
      </TabPanel>
      <TabPanel value="2">
        <JsonToCsv />
      </TabPanel>
      <TabPanel value="3">Item Three</TabPanel>
      <TabPanel value="4">Item Four</TabPanel>
    </TabContext>
  );
}
