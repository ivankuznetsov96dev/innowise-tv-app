import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';

export const changeChannelCategoryAction = createAction(
  ActionTypes.CHANGE_CHANNEL_CATEGORY,
  props<{ id: number }>(),
);
