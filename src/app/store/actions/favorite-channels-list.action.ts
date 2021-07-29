import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';
import { FavoriteChannelsListInterface } from '../../interfaces/favorite-channels-list.interface';

export const favoriteChannelsListAction = createAction(ActionTypes.FAVORITE_LIST);
export const favoriteChannelsListSuccessAction = createAction(
  ActionTypes.FAVORITE_LIST_SUCCESS,
  props<FavoriteChannelsListInterface>(),
);
export const favoriteChannelsListFailureAction = createAction(ActionTypes.FAVORITE_LIST_FAILURE);
