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
import {
  channelsListAction,
  channelsListActionFailure,
  channelsListActionSuccess,
} from './actions/channels-list.action';
import { changeChannelCategoryAction } from './actions/change-channel-category.action';

const initialState: StoreStateInterface = {
  favoriteChannels: [],
  channels: [],
  isLoading: false,
  isChannelsLoading: false,
  isLoggedIn: false,
  category_id: 0,
  isFavoriteLoading: false,
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
      isFavoriteLoading: true,
    }),
  ),
  on(
    favoriteChannelsListSuccessAction,
    (state, action): StoreStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      favoriteChannels: action.channels,
      isFavoriteLoading: false,
    }),
  ),
  on(
    favoriteChannelsListFailureAction,
    (state): StoreStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      favoriteChannels: [],
      isFavoriteLoading: false,
    }),
  ),
  on(
    channelsListAction,
    (state): StoreStateInterface => ({
      ...state,
      isLoading: true,
      isChannelsLoading: true,
    }),
  ),
  on(
    channelsListActionSuccess,
    (state, action): StoreStateInterface => ({
      ...state,
      isLoading: false,
      channels: action.channels,
      isChannelsLoading: false,
    }),
  ),
  on(
    channelsListActionFailure,
    (state): StoreStateInterface => ({
      ...state,
      isLoading: false,
      channels: [],
      isChannelsLoading: false,
    }),
  ),
  on(
    changeChannelCategoryAction,
    (state, action): StoreStateInterface => ({
      ...state,
      category_id: action.id,
    }),
  ),
);

export function reducers(state: StoreStateInterface, action: Action) {
  return favoriteReducer(state, action);
}
