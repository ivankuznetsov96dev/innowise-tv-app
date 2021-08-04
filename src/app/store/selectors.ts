import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { StoreStateInterface } from './types/store-state.interface';

export const storeFeatureSelector = createFeatureSelector<StoreStateInterface>('store');

export const isLoggedInSelector = createSelector(
  storeFeatureSelector,
  (storeState: StoreStateInterface) => storeState.isLoggedIn,
);

export const favoriteChannelsListSelector = createSelector(
  storeFeatureSelector,
  (storeState: StoreStateInterface) => storeState.favoriteChannels,
);

export const isLoadingSelector = createSelector(
  storeFeatureSelector,
  (storeState: StoreStateInterface) => storeState.isLoading,
);

export const channelsListSelector = createSelector(
  storeFeatureSelector,
  (storeState: StoreStateInterface) => storeState.channels,
);

export const filteredFavoriteChannelsList = createSelector(
  storeFeatureSelector,
  (storeState: StoreStateInterface) => {
    const list = storeState.channels;
    const favorite = storeState.favoriteChannels;

    return list.filter((el) =>
      favorite.some((favoriteEl) => favoriteEl.channel_id === el.channel_id),
    );
  },
);

export const filteredChannelsList = createSelector(
  storeFeatureSelector,
  (storeState: StoreStateInterface) => {
    if (storeState.category_id === 0) return storeState.channels;
    return storeState.channels.filter((el) =>
      el.genres?.some((id) => storeState.category_id === id),
    );
  },
);

export const isChannelsLoadingSelector = createSelector(
  storeFeatureSelector,
  (storeState: StoreStateInterface) => storeState.isChannelsLoading,
);

export const isFavoriteLoadingSelector = createSelector(
  storeFeatureSelector,
  (storeState: StoreStateInterface) => storeState.isFavoriteLoading,
);
