export enum ActionTypes {
  ADD_FAVORITE = '[Channels] Add favorite channel',
  ADD_FAVORITE_SUCCESS = '[Channels] Add favorite channel success',
  ADD_FAVORITE_FAILURE = '[Channels] Add favorite channel failure',

  DELETE_FAVORITE = '[Channels] Delete favorite channel',
  DELETE_FAVORITE_SUCCESS = '[Channels] Delete favorite channel success',
  DELETE_FAVORITE_FAILURE = '[Channels] Delete favorite channel failure',

  FAVORITE_LIST = '[Channels] Add favorite channels list',
  FAVORITE_LIST_SUCCESS = '[Channels] Add favorite channels list success',
  FAVORITE_LIST_FAILURE = '[Channels] Add favorite channels list failure',

  CHANNEL_LIST = '[Channels] Get channels list',
  CHANNEL_LIST_SUCCESS = '[Channels] Get channels list success',
  CHANNEL_LIST_FAILURE = '[Channels] Get channels list failure',

  CHANGE_CHANNEL_CATEGORY = '[Channels/chips] Change channel category',
}
