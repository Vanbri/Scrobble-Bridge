import React, { useState } from "react";
import { Box, Button, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { toCSV } from "../services/ToCsv-Service";
import { download } from "../services/Download-Service";
import { SpotifyTrack } from "../services/Spotify-Importer";

const JsonToCsv: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      alert("Selecciona un archivo JSON primero.");
      return;
    }

    try {
      setIsProcessing(true);
      const fileContent = await file.text();
      const tracks: SpotifyTrack[] = JSON.parse(fileContent);

      if (!Array.isArray(tracks)) {
        throw new Error("El archivo no contiene un array válido.");
      }

      const csvContent = toCSV(tracks);
      download(csvContent);
      alert("CSV generado y descargado con éxito.");
    } catch (error) {
      console.error("Error procesando el archivo:", error);
      alert("Hubo un error al procesar el archivo.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} maxWidth={400} margin="auto" mt={3}>
      <Typography variant="h6">History Converter</Typography>

      <Button variant="contained" component="label">
        Select File
        <input type="file" hidden onChange={handleFileChange} />
      </Button>

      <FormLabel>Output</FormLabel>
      <RadioGroup row>
        <FormControlLabel value="csv" control={<Radio />} label=".csv" />
        <FormControlLabel value="json" control={<Radio />} label=".json" />
        <FormControlLabel value="xml" control={<Radio />} label=".xml" />
      </RadioGroup>

      <Button variant="contained" onClick={handleConvert} disabled={isProcessing || !file}>
        {isProcessing ? "Procesing..." : "Convert"}
      </Button>
    </Box>
  );
};

export default JsonToCsv;
