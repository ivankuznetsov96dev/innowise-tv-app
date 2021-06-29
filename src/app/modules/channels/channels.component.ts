import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../../services/channel.service';
import { ChannelModel } from './interfaces/channel.model';

@Component({
  selector: 'app-chanells',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent implements OnInit {
  public channelList: ChannelModel[] = [];

  constructor(private getDataServ: ChannelService) {}

  ngOnInit(): void {
    this.getDataServ.getChannelsData().subscribe((value) => {
      this.channelList = value;
    });
  }
}
