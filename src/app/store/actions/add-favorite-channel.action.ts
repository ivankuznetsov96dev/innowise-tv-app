import { createAction } from '@ngrx/store';
import { ActionTypes } from '../action-types';

export const addFavoriteChannelAction = createAction(ActionTypes.ADD_FAVORITE);

export const addFavoriteChannelSuccessAction = createAction(ActionTypes.ADD_FAVORITE_SUCCESS);

export const addFavoriteChannelFailureAction = createAction(ActionTypes.ADD_FAVORITE_FAILURE);
