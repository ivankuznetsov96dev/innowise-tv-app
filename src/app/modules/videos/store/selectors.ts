import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VideosStoreInterface } from './types/videos-store.interface';

export const videosFeatureSelector = createFeatureSelector<VideosStoreInterface>('videos');

export const videosCategorySelector = createSelector(
  videosFeatureSelector,
  (videosState: VideosStoreInterface) => videosState.videos_categories,
);
