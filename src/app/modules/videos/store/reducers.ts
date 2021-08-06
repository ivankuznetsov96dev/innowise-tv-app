import { Action, createReducer, on } from '@ngrx/store';
import { VideosStoreInterface } from './types/videos-store.interface';
import {
  videosCategoryAction,
  videosCategoryActionFailure,
  videosCategoryActionSuccess,
} from './actions/videos-category.action';
import {
  videosContentListAction,
  videosContentListActionFeature,
  videosContentListActionSuccess,
  videosListAction,
} from './actions/videos-list.action';
import { VideoWripperModel } from '../../../shared/interfaces/video-wripper.model';

const initialState: VideosStoreInterface = {
  isLoading: false,
  videos_categories: [],
  videos_category_id: 0,
  videos_list: null,
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
  on(
    videosContentListAction,
    (state): VideosStoreInterface => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    videosContentListActionSuccess,
    (state, action): VideosStoreInterface => ({
      ...state,
      isLoading: false,
      videos_list: action,
    }),
  ),
  on(
    videosContentListActionFeature,
    (state): VideosStoreInterface => ({
      ...state,
      isLoading: false,
      videos_list: null,
    }),
  ),
);

export function reducers(state: VideosStoreInterface, action: Action) {
  return videosReducer(state, action);
}
