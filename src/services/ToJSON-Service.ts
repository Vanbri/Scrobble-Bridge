import { SpotifyTrack } from "../interfaces/Spotify-Track";

export function toJSON(tracks: SpotifyTrack[]): string {
    const data = tracks.map((track) => ({
        Artist: track.master_metadata_album_artist_name || "Unknown Artist",
        Album: track.master_metadata_album_album_name || "Unknown Album",
        Track: track.master_metadata_track_name || "Unknown Track",
        Date: Math.floor(Date.parse(track.ts) / 1000) || 0,
    }));
    return JSON.stringify(data, null, 2);
};