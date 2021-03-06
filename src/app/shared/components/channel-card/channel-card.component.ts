import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { formatDate } from '@angular/common';
import * as moment from 'moment';
import { Moment } from 'moment';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { ChannelModel } from '../../interfaces/channel.model';
import { TvshowModel } from '../../interfaces/tvshow.model';
import { ChannelService } from '../../services/channel.service';
import { FavoriteChannelService } from '../../services/favorite-channel.service';
import { PersistenceService } from '../../services/persistence.service';
import {
  favoriteChannelsListSelector,
  isLoadingSelector,
  isLoggedInSelector,
} from '../../../store/selectors';
import { addFavoriteChannelAction } from '../../../store/actions/add-favorite-channel.action';
import { deleteFavoriteChannelAction } from '../../../store/actions/delete-favorite-channel.action';

@Component({
  selector: 'app-channel-card',
  templateUrl: './channel-card.component.html',
  styleUrls: ['./channel-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelCardComponent implements OnInit, OnDestroy {
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

  public subjDestroyer$: Subject<void> = new Subject<void>();

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
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.store
      .pipe(select(favoriteChannelsListSelector), takeUntil(this.subjDestroyer$))
      .subscribe((value) => {
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

  ngOnDestroy(): void {
    this.subjDestroyer$.next();
  }
}
