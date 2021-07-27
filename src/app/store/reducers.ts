import { Action, createReducer, on } from '@ngrx/store';
import { addFavoriteChannelAction } from './actions/add-favorite-channel.action';
import { StoreStateInterface } from './types/store-state.interface';

const initialState: StoreStateInterface = {
  favoriteChannels: [],
  test: false,
};

const favoriteReducer = createReducer(
  initialState,
  on(addFavoriteChannelAction, (state) => ({
    ...state,
    test: true,
  })),
);

export function reducers(state: StoreStateInterface, action: Action) {
  return favoriteReducer(state, action);
}
