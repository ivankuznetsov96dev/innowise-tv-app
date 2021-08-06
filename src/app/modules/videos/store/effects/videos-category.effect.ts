import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { VideosService } from '../../../../shared/services/videos.service';
import {
  videosCategoryAction,
  videosCategoryActionFailure,
  videosCategoryActionSuccess,
} from '../actions/videos-category.action';
import {
  MovieCategory,
  MoviesCategoryModel,
} from '../../../../shared/interfaces/movies-category.model';

@Injectable()
export class VideosCategoryEffect {
  getCategories$ = createEffect(() =>
    this.action$.pipe(
      ofType(videosCategoryAction),
      switchMap(() =>
        this.videos.getVideosCategory().pipe(
          map((data: MoviesCategoryModel[]) => {
            const zeroCount: MovieCategory = {
              id: 0,
              name: 'Все жанры',
              name_en: 'All genres',
              is_main: true,
            };
            data.forEach((category) => {
              category.genres.unshift(zeroCount);
            });
            return videosCategoryActionSuccess({ videos_categories: data });
          }),
          catchError(() => of(videosCategoryActionFailure)),
        ),
      ),
    ),
  );

  constructor(private action$: Actions, private videos: VideosService) {}
}
