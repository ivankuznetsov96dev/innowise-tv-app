import { FavoriteChannelInterface } from '../../shared/interfaces/favorite-channels-list.interface';

export interface StoreStateInterface {
  favoriteChannels: FavoriteChannelInterface[];
  isLoading: boolean;
  isLoggedIn: boolean;
}
