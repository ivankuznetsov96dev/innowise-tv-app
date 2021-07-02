import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChannelModel } from '../channels/interfaces/channel.model';
import { ChannelService } from '../../services/channel.service';

@Component({
  selector: 'app-chennel-info',
  templateUrl: './chennel-info.component.html',
})
export class ChannelInfoComponent implements OnInit {
  public channel_info!: ChannelModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private channel: ChannelService,
  ) {}

  ngOnInit(): void {
    this.channel.getChannel(this.route.snapshot.params.channelId).subscribe((value) => {
      this.channel_info = value[0];
    });
  }
}
