import React, { useState } from "react";
import {
    Box,
    FormLabel,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

const ManagePage: React.FC = () => {
    const [fromDate, setFromDate] = useState<Dayjs | null>(null);
    const [toDate, setToDate] = useState<Dayjs | null>(null);
    const [username, setUsername] = useState("");
    const [data, setData] = useState<any[]>([]);

    const [showFilters, setShowFilters] = useState(false);

    const handleFetchData = async () => {
        if (!fromDate || !toDate || !username) {
            alert("Por favor, completa todos los filtros");
            return;
        }

        const fromTimestamp = Math.floor(fromDate.valueOf() / 1000);
        const toTimestamp = Math.floor(toDate.valueOf() / 1000);

        const url = `https://api.listenbrainz.org/1/user/${username}/listens?min_ts=${fromTimestamp}`;

        try {
            const response = await fetch(url);
            const json = await response.json();

            const filteredData = (json.payload.listens || []).filter((entry: any) => {
                return entry.listened_at < toTimestamp;
            });

            setData(filteredData);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    return (
        <Box maxWidth={800} margin="auto" mt={3}>
            {/* Botón para mostrar/ocultar filtros */}
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button variant="contained" onClick={() => setShowFilters(!showFilters)}>
                    {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
                </Button>
            </Box>

            {/* Sección de filtros que se oculta/muestra según showFilters */}
            {showFilters && (
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    mb={3}
                    p={2}
                    border="1px solid #ccc"
                    borderRadius="4px"
                >
                    <FormLabel>Filtros</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha inicio"
                            value={fromDate}
                            onChange={(newValue) => setFromDate(newValue)}
                        />
                        <DatePicker
                            label="Fecha fin"
                            value={toDate}
                            onChange={(newValue) => setToDate(newValue)}
                        />
                    </LocalizationProvider>
                    <TextField
                        label="Nombre de usuario"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleFetchData}>
                        Buscar
                    </Button>
                </Box>
            )}

            {/* Tabla de resultados */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Artist</TableCell>
                            <TableCell>Album</TableCell>
                            <TableCell>Track</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((entry, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {entry.track_metadata?.artist_name || "N/A"}
                                </TableCell>
                                <TableCell>
                                    {entry.track_metadata?.release_name || "N/A"}
                                </TableCell>
                                <TableCell>
                                    {entry.track_metadata?.track_name || "N/A"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ManagePage;
