import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';
import { MoviesCategoryModel } from '../../../../shared/interfaces/movies-category.model';

export const videosCategoryAction = createAction(ActionTypes.VIDEOS_CATEGORY);
export const videosCategoryActionSuccess = createAction(
  ActionTypes.VIDEOS_CATEGORY_SUCCESS,
  props<{ videos_categories: MoviesCategoryModel[] }>(),
);
export const videosCategoryActionFailure = createAction(ActionTypes.VIDEOS_CATEGORY_FAILURE);
