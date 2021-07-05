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

  public showStart: any;

  public showStop: any;

  constructor(private channel: ChannelService) {}

  ngOnInit(): void {
    this.showStart = moment.unix(this.tvshow.start!).locale('ru').format('HH:mm');
    this.showStop = moment.unix(this.tvshow.stop!).locale('ru').format('HH:mm');
  }
}
