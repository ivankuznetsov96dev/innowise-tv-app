import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { ChannelModel } from '../../interfaces/channel.model';
import { TvshowModel } from '../../interfaces/tvshow.model';
import { ChannelService } from '../../../../services/channel.service';

@Component({
  selector: 'app-channel-card',
  templateUrl: './channel-card.component.html',
  styleUrls: ['./channel-card.component.scss'],
})
export class ChannelCardComponent implements OnInit {
  @Input() info: ChannelModel = {};

  public tvShows$!: Observable<TvshowModel[]>;

  public date = new Date();

  public tvShowsFlag = false;

  constructor(private router: Router, private channel: ChannelService) {}

  ngOnInit(): void {
    // console.log(this.info);
  }

  public goToChennel(): void {
    this.router.navigate(['/channel-info', this.info.channel_id]);
  }

  public changeTvShowsFlag() {
    this.tvShowsFlag = !this.tvShowsFlag;
  }

  public getTodayTvShows() {
    this.changeTvShowsFlag();
    const dateFormatted = formatDate(this.date, 'y-MM-dd', 'en-US');
    this.tvShows$ = this.channel.getTvShows(this.info.channel_id!, dateFormatted, dateFormatted);
  }
}
