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
import { ChannelModel } from '../channels/interfaces/channel.model';
import { ChannelService } from '../../services/channel.service';
import { TvshowModel } from '../channels/interfaces/tvshow.model';

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

  private interval: any;

  public countOnChild!: Moment;

  public dateRange = new FormGroup({
    start: new FormControl(this.date.toDate()),
    end: new FormControl(this.date.toDate()),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private channel: ChannelService,
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

  public test(tvObj: TvshowModel): void {
    console.log(tvObj);
    moment.unix(tvObj.start!).locale('ru').format('HH:mm');
    moment.unix(tvObj.stop!).locale('ru').format('HH:mm');
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
