import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';

export const deleteFavoriteChannelAction = createAction(
  ActionTypes.DELETE_FAVORITE,
  props<{ channel_id: number }>(),
);

export const deleteFavoriteChannelSuccessAction = createAction(ActionTypes.DELETE_FAVORITE_SUCCESS);

export const deleteFavoriteChannelFailureAction = createAction(ActionTypes.DELETE_FAVORITE_FAILURE);
