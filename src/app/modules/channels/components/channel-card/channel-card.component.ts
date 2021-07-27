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
import { ChannelModel } from '../../../../interfaces/channel.model';
import { TvshowModel } from '../../../../interfaces/tvshow.model';
import { ChannelService } from '../../../../services/channel.service';
import { FavoriteChannelService } from '../../../../services/favorite-channel.service';
import { PersistenceService } from '../../../../services/persistence.service';

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

  constructor(
    private router: Router,
    private channel: ChannelService,
    private crd: ChangeDetectorRef,
    private favorite: FavoriteChannelService,
    private persistence: PersistenceService,
  ) {}

  ngOnInit(): void {
    this.isUserLogged = !!this.persistence.get('auth');
  }

  public goToChennel(): void {
    this.router.navigate(['/channel-info', this.info.channel_id]);
  }

  public changeTvShowsFlag(): void {
    this.tvShowsFlag = !this.tvShowsFlag;
  }

  public getTodayTvShows(): void {
    this.favorite.deleteFavoriteChannel(this.info.channel_id!);
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
