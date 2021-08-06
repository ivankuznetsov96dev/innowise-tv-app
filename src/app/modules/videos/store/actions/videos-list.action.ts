import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';
import { VideoWripperModel } from '../../../../shared/interfaces/video-wripper.model';

export const videosListAction = createAction(
  ActionTypes.VIDEOS_LIST,
  props<{ videos_category_id: number }>(),
);

export const videosContentListAction = createAction(
  ActionTypes.VIDEOS_CONTENT_LIST,
  props<{ category_id: number; offset?: number; genre_id?: number }>(),
);
export const videosContentListActionSuccess = createAction(
  ActionTypes.VIDEOS_CONTENT_LIST_SUCCESS,
  props<VideoWripperModel>(),
);
export const videosContentListActionFeature = createAction(ActionTypes.VIDEOS_CONTENT_LIST_FEATURE);
