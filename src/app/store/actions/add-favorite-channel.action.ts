import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';

export const addFavoriteChannelAction = createAction(
  ActionTypes.ADD_FAVORITE,
  props<{ channel_id: number }>(),
);

export const addFavoriteChannelSuccessAction = createAction(ActionTypes.ADD_FAVORITE_SUCCESS);

export const addFavoriteChannelFailureAction = createAction(ActionTypes.ADD_FAVORITE_FAILURE);
