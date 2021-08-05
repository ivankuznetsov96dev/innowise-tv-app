import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavoriteChannelService } from '../../shared/services/favorite-channel.service';
import {
  favoriteChannelsListAction,
  favoriteChannelsListFailureAction,
  favoriteChannelsListSuccessAction,
} from '../actions/favorite-channels-list.action';
import { FavoriteChannelsListInterface } from '../../shared/interfaces/favorite-channels-list.interface';
import { PersistenceService } from '../../shared/services/persistence.service';

@Injectable()
export class FavoriteChannelsListEffect {
  favoriteChannelsList$ = createEffect(() =>
    this.action$.pipe(
      ofType(favoriteChannelsListAction),
      switchMap(() => {
        const token = this.persistence.get('auth');
        if (!token) {
          return of(favoriteChannelsListFailureAction());
        }
        return this.favoriteService.getFavoriteChannels().pipe(
          map((data: FavoriteChannelsListInterface) => {
            return favoriteChannelsListSuccessAction(data);
          }),
          catchError((err) => {
            if (err.status === 401) this.handlingError();
            return of(favoriteChannelsListFailureAction());
          }),
        );
      }),
    ),
  );

  private handlingError(): void {
    localStorage.removeItem('auth');
    this.router.navigate(['channels', 0]);
    this.alertBar.open('Authorization error. Please, auth your account', 'Close', {
      duration: 3000,
    });
  }

  constructor(
    private favoriteService: FavoriteChannelService,
    private action$: Actions,
    private persistence: PersistenceService,
    private router: Router,
    private alertBar: MatSnackBar,
  ) {}
}
