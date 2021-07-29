import { Action, createReducer, on } from '@ngrx/store';
import {
  addFavoriteChannelAction,
  addFavoriteChannelFailureAction,
  addFavoriteChannelSuccessAction,
} from './actions/add-favorite-channel.action';
import { StoreStateInterface } from './types/store-state.interface';
import {
  favoriteChannelsListAction,
  favoriteChannelsListFailureAction,
  favoriteChannelsListSuccessAction,
} from './actions/favorite-channels-list.action';
import {
  deleteFavoriteChannelAction,
  deleteFavoriteChannelFailureAction,
  deleteFavoriteChannelSuccessAction,
} from './actions/delete-favorite-channel.action';

const initialState: StoreStateInterface = {
  favoriteChannels: [],
  isLoading: false,
  isLoggedIn: false,
};

const favoriteReducer = createReducer(
  initialState,
  on(
    addFavoriteChannelAction,
    (state): StoreStateInterface => ({
      ...state,
      isLoading: true,
    }),
  ),

  on(
    addFavoriteChannelSuccessAction,
    (state): StoreStateInterface => ({
      ...state,
      isLoading: false,
    }),
  ),

  on(
    addFavoriteChannelFailureAction,
    (state): StoreStateInterface => ({
      ...state,
      isLoading: false,
    }),
  ),

  on(
    deleteFavoriteChannelAction,
    (state): StoreStateInterface => ({
      ...state,
      isLoading: true,
    }),
  ),

  on(
    deleteFavoriteChannelSuccessAction,
    (state): StoreStateInterface => ({
      ...state,
      isLoading: false,
    }),
  ),

  on(
    deleteFavoriteChannelFailureAction,
    (state): StoreStateInterface => ({
      ...state,
      isLoading: false,
    }),
  ),

  on(
    favoriteChannelsListAction,
    (state): StoreStateInterface => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    favoriteChannelsListSuccessAction,
    (state, action): StoreStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      favoriteChannels: action.channels,
    }),
  ),
  on(
    favoriteChannelsListFailureAction,
    (state): StoreStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      favoriteChannels: [],
    }),
  ),
);

export function reducers(state: StoreStateInterface, action: Action) {
  return favoriteReducer(state, action);
}
