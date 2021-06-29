import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../../services/channel.service';
import { ChannelModel } from './interfaces/channel.model';
// import { ScrollDispatcher } from '@angular/cdk/overlay';
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-chanells',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent implements OnInit {
  // public channelList$: Observable<ChannelModel[]>;
  public channelList: ChannelModel[] = [];

  // public end: number = 10;

  // constructor(private getDataServ: ChannelService, private scrollDispatcher: ScrollDispatcher) {
  constructor(private getDataServ: ChannelService) {
    // this.scrollDispatcher.scrolled().subscribe((x) => console.log(x));
  }

  ngOnInit(): void {
    // this.channelList$ = this.getDataServ.getChannelsData();
    this.getDataServ.getChannelsData().subscribe((value) => {
      this.channelList = value;
      this.getMaxRaiting();
    });
  }

  public getMaxRaiting(): void {
    // this.channelList.forEach(el => console.log(el.rank))
    // console.log(this.channelList.sort((prev, next) => next.rank - prev.rank));
    // const filtredChannelList = this.channelList.sort((prev, next) => {
    //   return prev.rank - next.rank;
    // });
    //
    // console.log(filtredChannelList);
  }
}
