import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  channelsListAction,
  channelsListActionFailure,
  channelsListActionSuccess,
} from '../actions/channels-list.action';
import { ChannelService } from '../../shared/services/channel.service';

@Injectable()
export class ChannelListEffect {
  getChannelList$ = createEffect(() =>
    this.action$.pipe(
      ofType(channelsListAction),
      switchMap(() =>
        this.channels.getChannelsData().pipe(
          map((data) => channelsListActionSuccess({ channels: data })),
          catchError(() => of(channelsListActionFailure)),
        ),
      ),
    ),
  );

  constructor(private action$: Actions, private channels: ChannelService) {}
}
