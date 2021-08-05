import { FavoriteChannelInterface } from '../../shared/interfaces/favorite-channels-list.interface';
import { ChannelModel } from '../../shared/interfaces/channel.model';

export interface StoreStateInterface {
  favoriteChannels: FavoriteChannelInterface[];
  channels: ChannelModel[];
  isLoading: boolean;
  isChannelsLoading: boolean;
  isLoggedIn: boolean;
  category_id: number;
  isFavoriteLoading: boolean;
}
