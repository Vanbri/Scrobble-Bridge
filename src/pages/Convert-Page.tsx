import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  Typography,
} from "@mui/material";
import { toCSV } from "../services/ToCSV-Service";
import { toJSON } from "../services/ToJSON-Service";
import { toXML } from "../services/ToXML-Service";
import { downloadFile } from "../services/Download-Service";
import { SpotifyTrack } from "../interfaces/Spotify-Track";

export const ConvertPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [output, setOutput] = useState("");
  const [format, setFormat] = useState("");
  const [preview, setPreview] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFormat = event.target.value;
    setFormat(newFormat);
    if (preview) {
      handleConvert(newFormat);
    }
  };

  const handleConvert = async (selectedFormat?: string) => {
    if (!file) {
      alert("Selecciona un archivo JSON primero.");
      return;
    }

    try {
      const fileContent = await file.text();
      const tracks: SpotifyTrack[] = JSON.parse(fileContent);

      if (!Array.isArray(tracks)) {
        throw new Error("El archivo no contiene un array válido.");
      }

      const conversionFormat = selectedFormat || format;
      let result = "";
      if (conversionFormat === "csv") {
        result = toCSV(tracks);
      } else if (conversionFormat === "json") {
        result = toJSON(tracks);
      } else if (conversionFormat === "xml") {
        result = toXML(tracks);
      }

      if (preview) {
        setOutput(result);
      } else {
        downloadFile(result, "convertedFile", conversionFormat);
      }
    } catch (error) {
      console.error("Error procesando el archivo:", error);
      alert("Hubo un error al procesar el archivo.");
    }
  };

  useEffect(() => {
    if (preview && file && format !== "") {
      handleConvert();
    }
  }, [preview, file, format]);

  const outputOptionsDisabled = file === null;
  const convertDisabled = file === null || format === "";

  return (
    <Box display="flex" flexDirection="row" gap={2} justifyContent="center" mt={3}>
      <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
        <Typography variant="h6">History Converter</Typography>

        <Button variant="contained" component="label">
          Select File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        {file && (
          <Typography variant="body2">
            Archivo seleccionado: {file.name}
          </Typography>
        )}

        <FormLabel>Output</FormLabel>
        <RadioGroup row value={format} onChange={handleFormatChange}>
          <FormControlLabel
            value="csv"
            control={<Radio disabled={outputOptionsDisabled} />}
            label=".csv" />
          <FormControlLabel
            value="json"
            control={<Radio disabled={outputOptionsDisabled} />}
            label=".json" />
          <FormControlLabel
            value="xml"
            control={<Radio disabled={outputOptionsDisabled} />}
            label=".xml" />
          <FormControlLabel
            control={
              <Switch
                disabled={outputOptionsDisabled}
                checked={preview}
                onChange={(e) => setPreview(e.target.checked)} />
            }
            label="Preview" />
        </RadioGroup>

        {!preview && (
          <Button
            variant="contained"
            onClick={() => handleConvert()}
            disabled={convertDisabled}
          >
            Convert
          </Button>
        )}
      </Box>

      {preview && output && (
        <Box
          component="pre"
          sx={{
            fontFamily: "Consolas, monospace",
            fontSize: "0.9rem",
            backgroundColor: "#f5f5f5",
            padding: 2,
            borderRadius: 1,
            height: "80vh",
            overflow: "auto",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {output}
        </Box>
      )}
    </Box>
  );
};
