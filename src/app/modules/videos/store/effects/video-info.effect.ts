import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TvshowsService } from '../../../../shared/services/tvshows.service';
import {
  videoInfoAction,
  videoInfoActionFailure,
  videoInfoActionSuccess,
} from '../actions/video-info.action';
import { VideoInfoModel } from '../../../../shared/interfaces/video-info.model';
import { DirectorNameAndRole } from '../../../../shared/interfaces/person-info.model';

@Injectable()
export class VideoInfoEffect {
  // getVideoInfo$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(videoInfoAction),
  //     switchMap(({ video_id }) =>
  //       this.tvshows.getTvshowDeepInfo(`${video_id}`).pipe(
  //         map((data) => videoInfoActionSuccess({ video_info: data })),
  //         catchError(() => of(videoInfoActionFailure())),
  //       ),
  //     ),
  //   ),
  // );

  getVideoInfo$ = createEffect(() =>
    this.action$.pipe(
      ofType(videoInfoAction),
      switchMap(({ video_id }) =>
        this.tvshows.getTvshowDeepInfo(`${video_id}`).pipe(
          switchMap((data: VideoInfoModel) =>
            this.tvshows.getDirectorInfo(data.director, data.video_id).pipe(
              map((director: DirectorNameAndRole[]) => (data.personal = director)),
              switchMap(() =>
                this.tvshows.getDirectorInfo(data.cast, data.video_id).pipe(
                  map((cast) => {
                    // @ts-ignore
                    data.personal = [...data.personal, ...cast];
                    return videoInfoActionSuccess({ video_info: data });
                  }),
                  catchError(() => of(videoInfoActionFailure())),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  );

  constructor(private action$: Actions, private tvshows: TvshowsService) {}
}
