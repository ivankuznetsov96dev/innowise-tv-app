import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TvshowsService } from '../../../../shared/services/tvshows.service';
import {
  videoInfoAction,
  videoInfoActionFailure,
  videoInfoActionSuccess,
} from '../actions/video-info.action';

@Injectable()
export class VideoInfoEffect {
  getVideoInfo$ = createEffect(() =>
    this.action$.pipe(
      ofType(videoInfoAction),
      switchMap(({ video_id }) =>
        this.tvshows.getTvshowDeepInfo(`${video_id}`).pipe(
          map((data) => videoInfoActionSuccess({ video_info: data })),
          catchError(() => of(videoInfoActionFailure())),
        ),
      ),
    ),
  );

  constructor(private action$: Actions, private tvshows: TvshowsService) {}
}
