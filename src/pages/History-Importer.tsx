import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { processTracks, SpotifyTrack } from "../services/Spotify-Importer";

const HistoryImporter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Selecciona un archivo antes de enviar.");
      return;
    }

    const userToken = text.trim();
    if (!userToken) {
      alert("Ingresa un token de usuario.");
      return;
    }

    try {
      setIsLoading(true);
      const fileContent = await file.text();
      const parsedTracks: SpotifyTrack[] = JSON.parse(fileContent);

      await processTracks(userToken, parsedTracks);
      alert("Datos enviados correctamente");
    } catch (error) {
      console.error("Error procesando el archivo:", error);
      alert("Hubo un error al procesar el archivo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} maxWidth={400} margin="auto" mt={3}>
      <Typography variant="h6">Importar Historial</Typography>

      <Button variant="contained" component="label">
        Seleccionar Archivo
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      {file && <Typography variant="body2">Archivo seleccionado: {file.name}</Typography>}

      <TextField
        label="Token de usuario"
        variant="outlined"
        fullWidth
        value={text}
        onChange={handleTextChange}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Enviando..." : "Enviar"}
      </Button>
    </Box>
  );
};

export default HistoryImporter;
