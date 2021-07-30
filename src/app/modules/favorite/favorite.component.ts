import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChannelService } from '../../shared/services/channel.service';
import { FavoriteChannelService } from '../../shared/services/favorite-channel.service';
import { favoriteChannelsListSelector } from '../../store/selectors';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  public favoriteChannels$!: Observable<FavoriteChannelService>;

  constructor(private channel: ChannelService, private store: Store) {}

  ngOnInit(): void {
    // @ts-ignore
    this.favoriteChannels$ = this.store.pipe(select(favoriteChannelsListSelector));
  }
}
