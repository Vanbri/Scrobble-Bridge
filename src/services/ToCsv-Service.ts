import { SpotifyTrack } from "../interfaces/Spotify-Track";

export function toCSV(tracks: SpotifyTrack[]): string {
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