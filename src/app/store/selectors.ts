import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { entryPointKeyFor } from '@angular/compiler-cli/src/ngtsc/routing';
import { AppStateInterface } from './types/app-state.inteface';
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
