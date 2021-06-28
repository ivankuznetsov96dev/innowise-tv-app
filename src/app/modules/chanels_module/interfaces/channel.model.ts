export interface ChannelModel {
  channel_id ?: number;
  name ?: string;
  dvr_sec ?: number;
  age_rating ?: string;
  genres ?: number[];
  logo ?: string;
  priority ?: number;
  rank ?: number;
  available ?: boolean;
  stream_url ?: boolean;
  current_tvshow_id ?: string;
}
