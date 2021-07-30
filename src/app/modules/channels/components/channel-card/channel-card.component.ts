import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import * as moment from 'moment';
import { Moment } from 'moment';
import { select, Store } from '@ngrx/store';
import { ChannelModel } from '../../../../shared/interfaces/channel.model';
import { TvshowModel } from '../../../../shared/interfaces/tvshow.model';
import { ChannelService } from '../../../../shared/services/channel.service';
import { FavoriteChannelService } from '../../../../shared/services/favorite-channel.service';
import { PersistenceService } from '../../../../shared/services/persistence.service';
import {
  favoriteChannelsListSelector,
  isLoadingSelector,
  isLoggedInSelector,
} from '../../../../store/selectors';
import { addFavoriteChannelAction } from '../../../../store/actions/add-favorite-channel.action';
import { deleteFavoriteChannelAction } from '../../../../store/actions/delete-favorite-channel.action';

@Component({
  selector: 'app-channel-card',
  templateUrl: './channel-card.component.html',
  styleUrls: ['./channel-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelCardComponent implements OnInit {
  @Input() info: ChannelModel = {};

  public tvShows$!: Observable<TvshowModel[]>;

  public date = new Date();

  public tvShowsFlag = false;

  public countOnChild!: Moment;

  public interval: any;

  public isUserLogged = false;

  public isFavoriteChannel!: boolean;

  public isLoggedIn$!: Observable<boolean>;

  public isLoading$!: Observable<boolean>;

  public favoriteChannels$!: Observable<FavoriteChannelService>;

  constructor(
    private router: Router,
    private channel: ChannelService,
    private crd: ChangeDetectorRef,
    private favorite: FavoriteChannelService,
    private persistence: PersistenceService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.isUserLogged = !!this.persistence.get('auth');
    this.initializeData();
  }

  public initializeData(): void {
    // @ts-ignore
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    // @ts-ignore
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    // // @ts-ignore
    // this.favoriteChannels$ = this.store.pipe(select(favoriteChannelsListSelector));
    // @ts-ignore
    this.store.pipe(select(favoriteChannelsListSelector)).subscribe((value) => {
      this.isFavoriteChannel = value.some((next) => next.channel_id === this.info.channel_id);
    });
  }

  public goToChennel(): void {
    this.router.navigate(['/channel-info', this.info.channel_id]);
  }

  public changeTvShowsFlag(): void {
    this.tvShowsFlag = !this.tvShowsFlag;
  }

  public pressFavoriteBtn(): void {
    if (this.isFavoriteChannel) {
      this.store.dispatch(deleteFavoriteChannelAction({ channel_id: this.info.channel_id! }));
    } else {
      this.store.dispatch(addFavoriteChannelAction({ channel_id: this.info.channel_id! }));
    }
  }

  public getTodayTvShows(): void {
    this.changeTvShowsFlag();
    if (!this.tvShowsFlag) {
      clearInterval(this.interval);
    } else {
      const dateFormatted = formatDate(this.date, 'y-MM-dd', 'en-US');
      this.tvShows$ = this.channel.getTvShows(this.info.channel_id!, dateFormatted, dateFormatted);
      this.countOnChild = moment();
      this.interval = setInterval(() => {
        this.countOnChild = moment();
        this.crd.detectChanges();
      }, 1000);
    }
  }
}
