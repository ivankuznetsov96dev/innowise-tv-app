import { AfterContentChecked, Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ChannelModel } from '../channels/interfaces/channel.model';
import { ChannelService } from '../../services/channel.service';

@Component({
  selector: 'app-channel-info',
  templateUrl: './channel-info.component.html',
  styleUrls: ['./channel-info.component.scss'],
})
export class ChannelInfoComponent implements OnInit {
  public channel_info$!: Observable<ChannelModel>;

  public tvShows$!: Observable<any>;

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
    // this.channel.getChannel(this.route.snapshot.params.channelId).subscribe((value) => {
    //   this.channel_info = value[0];
    // });
    // this.channel.getChannelsData()
    this.channel_info$ = this.channel.getChannelInfo(this.route.snapshot.params.channelId);
    console.log(formatDate(this.date, 'MMM d, y, h:mm a', 'en-US'));
    console.log(this.date);
    console.log(this.date_range.value);
    this.onSubmit();
  }

  public onSubmit() {
    // console.log(this.date_range.value);
    // console.log(this.date_range.value.start);
    // console.log(this.date_range.value.end);
    const dateStart = formatDate(this.date_range.value.start, 'y-MM-dd', 'en-US');
    // console.log(dateStart);
    const dateEnd = formatDate(this.date_range.value.end, 'y-MM-dd', 'en-US');
    // console.log(dateEnd);
    this.tvShows$ = this.channel.getTvShows(this.route.snapshot.params.channelId, dateStart, dateEnd);
  }

  // private initForm() {
  //   this.calendar = this.fb.group({
  //     picked_date: ['', []],
  //   });
  // }
}
