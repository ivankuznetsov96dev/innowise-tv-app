import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { VideosService } from '../../../../shared/services/videos.service';
import {
  videosContentListAction,
  videosContentListActionFeature,
  videosContentListActionSuccess,
} from '../actions/videos-list.action';
import { VideoWripperModel } from '../../../../shared/interfaces/video-wripper.model';

@Injectable()
export class VideosListEffect {
  getVideosList$ = createEffect(() =>
    this.action$.pipe(
      ofType(videosContentListAction),
      switchMap(({ category_id, offset, genre_id }) =>
        this.videos.getVideosContent(category_id, offset, genre_id).pipe(
          map((data: VideoWripperModel) => {
            return videosContentListActionSuccess(data);
          }),
          catchError(() => of(videosContentListActionFeature)),
        ),
      ),
    ),
  );

  constructor(private action$: Actions, private videos: VideosService) {}
}
