import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FavoriteChannelService } from '../../shared/services/favorite-channel.service';
import { ChannelModel } from '../../shared/interfaces/channel.model';
import {
  filteredFavoriteChannelsList,
  isChannelsLoadingSelector,
  isFavoriteLoadingSelector,
  isLoadingSelector,
} from '../../store/selectors';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteComponent implements OnInit {
  public channelList!: ChannelModel[];

  public isFavoriteLoading$!: Observable<boolean>;

  public isChannelsLoading$!: Observable<boolean>;

  public channelList$!: Observable<ChannelModel[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isFavoriteLoading$ = this.store.pipe(select(isFavoriteLoadingSelector));
    this.isChannelsLoading$ = this.store.pipe(select(isChannelsLoadingSelector));
    this.channelList$ = this.store.pipe(select(filteredFavoriteChannelsList));
  }
}
