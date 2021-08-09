import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VideosStoreInterface } from './types/videos-store.interface';
import { MoviesCategoryModel } from '../../../shared/interfaces/movies-category.model';

export const videosFeatureSelector = createFeatureSelector<VideosStoreInterface>('videos');

export const videosCategorySelector = createSelector(
  videosFeatureSelector,
  (videosState: VideosStoreInterface) => videosState.videos_categories,
);

export const videosCategoryInfoSelector = createSelector(
  videosFeatureSelector,
  (videosState: VideosStoreInterface) =>
    videosState.videos_categories.filter(
      (category: MoviesCategoryModel) => category.id === videosState.videos_category_id,
    )[0],
);

export const videosListSelector = createSelector(
  videosFeatureSelector,
  (videosState: VideosStoreInterface) => videosState.videos_list,
);

export const paginatorSizeSelector = createSelector(
  videosFeatureSelector,
  // @ts-ignore
  (videosState: VideosStoreInterface) => Math.ceil(videosState.videos_list?.total / 20),
);

export const videoInfoSelector = createSelector(
  videosFeatureSelector,
  (videosState: VideosStoreInterface) => videosState.video_info,
);
