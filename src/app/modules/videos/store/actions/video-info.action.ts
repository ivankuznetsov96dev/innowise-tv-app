import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';
import { VideoInfoModel } from '../../../../shared/interfaces/video-info.model';

export const videoInfoAction = createAction(ActionTypes.VIDEO_INFO, props<{ video_id: number }>());

export const videoInfoActionSuccess = createAction(
  ActionTypes.VIDEO_INFO_SUCCESS,
  props<{ video_info: VideoInfoModel }>(),
);

export const videoInfoActionFailure = createAction(ActionTypes.VIDEO_INFO_FAILURE);
