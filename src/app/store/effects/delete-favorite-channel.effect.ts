import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FavoriteChannelService } from '../../shared/services/favorite-channel.service';
import { favoriteChannelsListAction } from '../actions/favorite-channels-list.action';
import {
  deleteFavoriteChannelAction,
  deleteFavoriteChannelFailureAction,
  deleteFavoriteChannelSuccessAction,
} from '../actions/delete-favorite-channel.action';

@Injectable()
export class DeleteFavoriteChannelEffect {
  deleteFavoriteChannel$ = createEffect(() =>
    this.action$.pipe(
      ofType(deleteFavoriteChannelAction),
      switchMap(({ channel_id }) => {
        return this.favoriteService.deleteFavoriteChannel(channel_id).pipe(
          map((data) => {
            return deleteFavoriteChannelSuccessAction();
          }),
          catchError(() => of(deleteFavoriteChannelFailureAction())),
        );
      }),
    ),
  );

  checkNewFavoriteChannelList$ = createEffect(() =>
    this.action$.pipe(
      ofType(deleteFavoriteChannelSuccessAction),
      switchMap(() => {
        return of(favoriteChannelsListAction());
      }),
    ),
  );

  constructor(private action$: Actions, private favoriteService: FavoriteChannelService) {}
}
