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

@Injectable()
export class VideosCategoryEffect {
  getCategories$ = createEffect(() =>
    this.action$.pipe(
      ofType(videosCategoryAction),
      switchMap(() =>
        this.videos.getVideosCategory().pipe(
          map((data) => videosCategoryActionSuccess({ videos_categories: data })),
          catchError(() => of(videosCategoryActionFailure)),
        ),
      ),
    ),
  );

  constructor(private action$: Actions, private videos: VideosService) {}
}
