import { SpotifyTrack } from "../interfaces/Spotify-Track";

export function toXML(tracks: SpotifyTrack[]): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<Tracks>\n';
    tracks.forEach((track) => {
        const artist = track.master_metadata_album_artist_name || "Unknown Artist";
        const album = track.master_metadata_album_album_name || "Unknown Album";
        const trackName = track.master_metadata_track_name || "Unknown Track";
        const date = Math.floor(Date.parse(track.ts) / 1000) || 0;
        xml += `  <Track>\n`;
        xml += `    <Artist>${artist}</Artist>\n`;
        xml += `    <Album>${album}</Album>\n`;
        xml += `    <TrackName>${trackName}</TrackName>\n`;
        xml += `    <Date>${date}</Date>\n`;
        xml += `  </Track>\n`;
    });
    xml += '</Tracks>';
    return xml;
};