import { Action, createReducer, on } from '@ngrx/store';
import { VideosStoreInterface } from './types/videos-store.interface';
import {
  videosCategoryAction,
  videosCategoryActionFailure,
  videosCategoryActionSuccess,
} from './actions/videos-category.action';

const initialState: VideosStoreInterface = {
  isLoading: false,
  videos_categories: [],
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
);

export function reducers(state: VideosStoreInterface, action: Action) {
  return videosReducer(state, action);
}
