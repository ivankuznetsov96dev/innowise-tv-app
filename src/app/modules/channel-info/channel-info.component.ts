import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ChannelModel } from '../../shared/interfaces/channel.model';
import { ChannelService } from '../../shared/services/channel.service';
import { TvshowModel } from '../../shared/interfaces/tvshow.model';
import { TvshowsService } from '../../shared/services/tvshows.service';
import { TvshowTitleModel } from '../../shared/interfaces/tvshow-title.model';

@Component({
  selector: 'app-channel-info',
  templateUrl: './channel-info.component.html',
  styleUrls: ['./channel-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelInfoComponent implements OnInit, OnDestroy {
  public channelInfo$!: Observable<ChannelModel>;

  public tvShows$!: Observable<TvshowModel[]>;

  public date: Moment = moment();

  public tvTitleId!: string;

  public isModalWindowFlag = false;

  public countOnChild!: Moment;

  public dateRange = new FormGroup({
    start: new FormControl(this.date.toDate()),
    end: new FormControl(this.date.toDate()),
  });

  private interval: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private channel: ChannelService,
    private tvshow: TvshowsService,
    private crd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const { channelId } = this.route.snapshot.params;
    this.channelInfo$ = this.channel.getChannelInfo(channelId);
    this.onSubmit();
    this.countOnChild = moment();
    this.interval = setInterval(() => {
      this.countOnChild = moment();
      this.crd.detectChanges();
    }, 1000);
  }

  public onSubmit(): void {
    const dateStart = formatDate(this.dateRange.value.start, 'y-MM-dd', 'en-US');
    const dateEnd = formatDate(this.dateRange.value.end, 'y-MM-dd', 'en-US');
    this.tvShows$ = this.channel.getTvShows(
      this.route.snapshot.params.channelId,
      dateStart,
      dateEnd,
    );
  }

  public openTvShowInfo(event: string): void {
    // console.log(event);
    // this.isModalWindowFlag = true;
    // this.tvshow.getTvshowTitleInfo(event);
    this.tvTitleId = event;
    this.isModalWindowFlag = true;
  }

  public closeModalWindow(event: boolean): void {
    this.isModalWindowFlag = event;
  }

  public goToUp(): void {
    // console.log(this.route.snapshot.params.channelId);
    const count = this.route.snapshot.params.channelId;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
