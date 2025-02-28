import { SpotifyTrack } from "./Spotify-Importer";

export const convertToCSV = (tracks: SpotifyTrack[]): string => {
  const headers = ["Artist", "Album", "Track", "Date"];
  const rows = tracks.map((track) => [
    track.master_metadata_album_artist_name || "Unknown Artist",
    track.master_metadata_album_album_name || "Unknown Album",
    track.master_metadata_track_name || "Unknown Track",
    Math.floor(Date.parse(track.ts) / 1000) || 0, // Convertimos a UNIX
  ]);

  const csvContent = [headers, ...rows].map((e) => e.join(";")).join("\n");
  return csvContent;
};

export const downloadCSV = (csvContent: string, filename: string = "tracks.csv") => {
  const blob = new Blob([csvContent], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
