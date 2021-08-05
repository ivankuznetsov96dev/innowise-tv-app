import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';

export const videosListAction = createAction(
  ActionTypes.VIDEOS_LIST,
  props<{ videos_category_id: number }>(),
);
