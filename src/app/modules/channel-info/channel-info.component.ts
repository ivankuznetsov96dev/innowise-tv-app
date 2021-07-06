import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {formatDate} from '@angular/common';
import {FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {ChannelModel} from '../channels/interfaces/channel.model';
import {ChannelService} from '../../services/channel.service';
import {TvshowModel} from '../channels/interfaces/tvshow.model';

@Component({
  selector: 'app-channel-info',
  templateUrl: './channel-info.component.html',
  styleUrls: ['./channel-info.component.scss'],
})
export class ChannelInfoComponent implements OnInit {
  public channelInfo$!: Observable<ChannelModel>;

  public tvShows$!: Observable<TvshowModel[]>;

  public date = new Date();

  public date_range = new FormGroup({
    start: new FormControl(this.date),
    end: new FormControl(this.date),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private channel: ChannelService,
  ) {}

  ngOnInit(): void {
    const { channelId } = this.route.snapshot.params;
    this.channelInfo$ = this.channel.getChannelInfo(channelId);
    console.log(formatDate(this.date, 'MMM d, y, h:mm a', 'en-US'));
    console.log(this.date);
    console.log(this.date_range.value);
    this.onSubmit();

    setInterval(()=> {
      this.channel.getSomevone.next();
    }, 500);
  }

  public onSubmit(): void {
    const dateStart = formatDate(this.date_range.value.start, 'y-MM-dd', 'en-US');
    const dateEnd = formatDate(this.date_range.value.end, 'y-MM-dd', 'en-US');
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
}
