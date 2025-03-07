import axios from "axios";
import { SpotifyTrack } from "../interfaces/Spotify-Track";

const LISTENBRAINZ_API = "https://api.listenbrainz.org/1/submit-listens";
const BATCH_SIZE = 1000;
const DELAY_MS = 3000;

const chunkList = <T,>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const sendBatch = async (tracksBatch: SpotifyTrack[], batchNumber: number, userToken: string) => {
  const payload = {
    listen_type: "import",
    payload: tracksBatch.map((track) => ({
      listened_at: Math.floor(Date.parse(track.ts) / 1000),
      track_metadata: {
        track_name: track.master_metadata_track_name,
        artist_name: track.master_metadata_album_artist_name,
        release_name: track.master_metadata_album_album_name,
        additional_info: {
          platform: track.platform,
          ms_played: track.ms_played,
          conn_country: track.conn_country,
          ip_addr: track.ip_addr,
          spotify_track_uri: track.spotify_track_uri,
          episode_name: track.episode_name,
          episode_show_name: track.episode_show_name,
          spotify_episode_uri: track.spotify_episode_uri,
          audiobook_title: track.audiobook_title,
          audiobook_uri: track.audiobook_uri,
          audiobook_chapter_uri: track.audiobook_chapter_uri,
          audiobook_chapter_title: track.audiobook_chapter_title,
          reason_start: track.reason_start,
          reason_end: track.reason_end,
          shuffle: track.shuffle,
          skipped: track.skipped,
          offline: track.offline,
          offline_timestamp: track.offline_timestamp,
          incognito_mode: track.incognito_mode,
        },
      },
    })),
  };

  try {
    const response = await axios.post(LISTENBRAINZ_API, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userToken}`,
      },
    });
    console.log(`Lote ${batchNumber} enviado correctamente:`, response.data);
  } catch (error) {
    console.error(`Error al enviar el lote ${batchNumber}:`, error);
  }
};

export const processTracks = async (userToken: string, tracks: SpotifyTrack[]) => {
  if (!Array.isArray(tracks)) {
    throw new Error("El archivo JSON no contiene un array válido");
  }

  const trackBatches = chunkList(tracks, BATCH_SIZE);
  console.log(`Se enviarán ${trackBatches.length} lotes de ${BATCH_SIZE} canciones.`);

  for (let i = 0; i < trackBatches.length; i++) {
    await sendBatch(trackBatches[i], i + 1, userToken);
    if (i < trackBatches.length - 1) {
      console.log(`Esperando ${DELAY_MS / 1000} segundos antes de enviar el siguiente lote...`);
      await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    }
  }
  console.log("Proceso completado.");
};
