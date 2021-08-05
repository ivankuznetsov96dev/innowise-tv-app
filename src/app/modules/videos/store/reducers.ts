import { Action, createReducer, on } from '@ngrx/store';
import { VideosStoreInterface } from './types/videos-store.interface';
import {
  videosCategoryAction,
  videosCategoryActionFailure,
  videosCategoryActionSuccess,
} from './actions/videos-category.action';
import { videosListAction } from './actions/videos-list.action';

const initialState: VideosStoreInterface = {
  isLoading: false,
  videos_categories: [],
  videos_category_id: 0,
};

const videosReducer = createReducer(
  initialState,
  on(
    videosCategoryAction,
    (state): VideosStoreInterface => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    videosCategoryActionFailure,
    (state): VideosStoreInterface => ({
      ...state,
      isLoading: false,
    }),
  ),
  on(
    videosCategoryActionSuccess,
    (state, action): VideosStoreInterface => ({
      ...state,
      isLoading: false,
      videos_categories: action.videos_categories,
    }),
  ),
  on(
    videosListAction,
    (state, action): VideosStoreInterface => ({
      ...state,
      videos_category_id: action.videos_category_id,
    }),
  ),
);

export function reducers(state: VideosStoreInterface, action: Action) {
  return videosReducer(state, action);
}
