export interface SpotifyTrack {
    ts: string;
    master_metadata_track_name?: string;
    master_metadata_album_artist_name?: string;
    master_metadata_album_album_name?: string;
    platform?: string;
    ms_played?: number;
    conn_country?: string;
    ip_addr?: string;
    spotify_track_uri?: string;
    episode_name?: string;
    episode_show_name?: string;
    spotify_episode_uri?: string;
    audiobook_title?: string;
    audiobook_uri?: string;
    audiobook_chapter_uri?: string;
    audiobook_chapter_title?: string;
    reason_start?: string;
    reason_end?: string;
    shuffle?: boolean;
    skipped?: boolean;
    offline?: boolean;
    offline_timestamp?: number;
    incognito_mode?: boolean;
}
