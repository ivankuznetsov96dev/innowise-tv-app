import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FavoriteChannelService } from '../../shared/services/favorite-channel.service';
import {
  addFavoriteChannelAction,
  addFavoriteChannelFailureAction,
  addFavoriteChannelSuccessAction,
} from '../actions/add-favorite-channel.action';
import { favoriteChannelsListAction } from '../actions/favorite-channels-list.action';

@Injectable()
export class AddFavoriteChannelEffect {
  addFavoriteChannel$ = createEffect(() =>
    this.action$.pipe(
      ofType(addFavoriteChannelAction),
      switchMap(({ channel_id }) => {
        return this.favoriteService.postFavoriteChannel(channel_id).pipe(
          map((data) => {
            return addFavoriteChannelSuccessAction();
          }),
          catchError(() => of(addFavoriteChannelFailureAction())),
        );
      }),
    ),
  );

  checkNewFavoriteChannelList$ = createEffect(() =>
    this.action$.pipe(
      ofType(addFavoriteChannelSuccessAction),
      switchMap(() => {
        return of(favoriteChannelsListAction());
      }),
    ),
  );

  constructor(private action$: Actions, private favoriteService: FavoriteChannelService) {}
}
