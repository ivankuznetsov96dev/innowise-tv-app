export interface FavoriteChannelsListInterface {
  channels: FavoriteChannelInterface[];
}

export interface FavoriteChannelInterface {
  channel_id: number;
  added_time: number;
}
