import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';
import { ChannelModel } from '../../shared/interfaces/channel.model';

export const channelsListAction = createAction(ActionTypes.CHANNEL_LIST);
export const channelsListActionSuccess = createAction(
  ActionTypes.CHANNEL_LIST_SUCCESS,
  props<{channels: ChannelModel[]}>(),
);
export const channelsListActionFailure = createAction(ActionTypes.CHANNEL_LIST_FAILURE);
