import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { convertToCSV, downloadCSV } from "../services/jsonToCsv";
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

      const csvContent = convertToCSV(tracks);
      downloadCSV(csvContent);
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
      <Typography variant="h6">Convertir JSON a CSV</Typography>

      <Button variant="contained" component="label">
        Seleccionar Archivo JSON
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      {file && <Typography variant="body2">Archivo seleccionado: {file.name}</Typography>}

      <Button variant="contained" color="primary" onClick={handleConvert} disabled={isProcessing}>
        {isProcessing ? "Procesando..." : "Convertir a CSV"}
      </Button>
    </Box>
  );
};

export default JsonToCsv;
