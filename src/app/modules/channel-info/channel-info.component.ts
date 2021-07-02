import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChannelModel } from '../channels/interfaces/channel.model';
import { ChannelService } from '../../services/channel.service';

@Component({
  selector: 'app-channel-info',
  templateUrl: './channel-info.component.html',
  styleUrls: ['./channel-info.component.scss'],
})
export class ChannelInfoComponent implements OnInit {
  public channel_info$!: Observable<ChannelModel>;

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
  }
}
