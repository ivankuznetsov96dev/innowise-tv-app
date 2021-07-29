import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FavoriteChannelService } from '../../services/favorite-channel.service';
import {
  favoriteChannelsListAction,
  favoriteChannelsListFailureAction,
  favoriteChannelsListSuccessAction,
} from '../actions/favorite-channels-list.action';
import { FavoriteChannelsListInterface } from '../../interfaces/favorite-channels-list.interface';
import { PersistenceService } from '../../services/persistence.service';

@Injectable()
export class FavoriteChannelsListEffect {
  favoriteChannelsList$ = createEffect(() =>
    this.action$.pipe(
      ofType(favoriteChannelsListAction),
      switchMap(() => {
        const token = this.persistence.get('auth');
        console.log(token);
        if (!token) {
          return of(favoriteChannelsListFailureAction());
        }
        return this.favoriteService.getFavoriteChannels().pipe(
          map((data: FavoriteChannelsListInterface) => {
            return favoriteChannelsListSuccessAction(data);
          }),
          catchError(() => of(favoriteChannelsListFailureAction())),
        );
      }),
    ),
  );

  constructor(
    private favoriteService: FavoriteChannelService,
    private action$: Actions,
    private persistence: PersistenceService,
  ) {}
}
