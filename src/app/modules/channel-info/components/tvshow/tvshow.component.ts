import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ChannelService } from '../../../../services/channel.service';
import { TvshowModel } from '../../../channels/interfaces/tvshow.model';

@Component({
  selector: 'app-tvshow',
  templateUrl: './tvshow.component.html',
  styleUrls: ['./tvshow.component.scss'],
})
export class TvshowComponent implements OnInit {
  @Input() tvshow!: TvshowModel;

  public showStart!: string;

  public showStop!: string;

  public date = new Date();

  public liveFlag = false;

  public recordingFlag = false;

  constructor(private channel: ChannelService) {}

  ngOnInit(): void {
    this.showStart = moment.unix(this.tvshow.start!).locale('ru').format('dd HH:mm');
    this.showStop = moment.unix(this.tvshow.stop!).locale('ru').format('dd HH:mm');
    this.setProgressbarAndFlags();
  }

  public setProgressbarAndFlags(): void {
    const count1 = moment.unix(this.tvshow.start!).locale('ru').toDate();
    const count2 = moment.unix(this.tvshow.stop!).locale('ru').toDate();
    this.liveFlag = !!(this.date > count1 && this.date < count2);
    this.recordingFlag = !!(this.date > count1 && this.date > count2);
  }

  public test(): void {
    const count1 = moment.unix(this.tvshow.start!).locale('ru').toDate();
    const count2 = moment.unix(this.tvshow.stop!).locale('ru').toDate();
    // console.log(moment().subtract(count1.getTime(), count2.getTime()).millisecond());
    // const asd = Math.abs(count2.getTime() - count1.getTime());
    // console.log(asd);

    // let endDate = new Date("2018-11-29 10:49:07.4154497");
    // let purchaseDate = new Date("2018-11-29 10:49:49.9396033");
    // let diffMs = (purchaseDate - endDate); // milliseconds
    // let diffDays = Math.floor(diffMs / 86400000); // days
    // let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    // let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    // console.log(diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes");
  }
}
