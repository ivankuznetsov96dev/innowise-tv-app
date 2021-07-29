import {createFeatureSelector, createSelector, Store} from '@ngrx/store';
import { AppStateInterface } from './types/app-state.inteface';
import { StoreStateInterface } from './types/store-state.interface';

export const storeFeatureSelector = createFeatureSelector<AppStateInterface, StoreStateInterface>(
  'store',
);

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
