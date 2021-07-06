import { ChangeDetectorRef, Component, DoCheck, Input, NgZone, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ChannelService } from '../../../../services/channel.service';
import { TvshowModel } from '../../../channels/interfaces/tvshow.model';

@Component({
  selector: 'app-tvshow',
  templateUrl: './tvshow.component.html',
  styleUrls: ['./tvshow.component.scss'],
})
export class TvshowComponent implements OnInit, DoCheck {
  @Input() tvshow!: TvshowModel;

  public showStart!: string;

  public showStop!: string;

  public liveFlag = false;

  public recordingFlag = false;

  public hourCount = 16;

  public testCount = 16;

  public progressbarValue$: BehaviorSubject<any> = new BehaviorSubject<any>(0);

  constructor(private channel: ChannelService) {}

  ngOnInit(): void {
    this.showStart = moment.unix(this.tvshow.start!).locale('ru').format('dd HH:mm');
    this.showStop = moment.unix(this.tvshow.stop!).locale('ru').format('dd HH:mm');
    this.setProgressbarAndFlags();

    this.channel.getSomevone.subscribe(()=> {
      this.setProgressbarAndFlags();
    })

    // setInterval(() => {
    //   console.log('testCount ', this.testCount);
    //   this.setProgressbarAndFlags();
    // }, 1000);
  }

  ngDoCheck(): void {
    this.progressbarValue$.subscribe((value) => {
      if (value === 100) {
        // this.setProgressbarAndFlags();
        console.log('Check!');
        this.setProgressbarAndFlags();
      }
    });
  }

  public setProgressbarAndFlags(): void {
    const startDate = moment.unix(this.tvshow.start!).toDate();
    const stopDate = moment.unix(this.tvshow.stop!).toDate();
    const date = new Date(`2021-07-06 ${this.hourCount}:${this.testCount}`);
    // this.liveFlag = !!(this.date > count1 && this.date < count2);
    // this.recordingFlag = !!(this.date > count1 && this.date > count2);
    this.liveFlag = !!(date > startDate && date < stopDate);
    this.recordingFlag = !!(date > startDate && date >= stopDate);
    console.log('FLAG ', this.liveFlag, this.recordingFlag);
    if (this.liveFlag) this.getProgressbarValue();
  }

  public test(): void {
    this.setProgressbarAndFlags();
    // console.log('testCount: ', this.testCount);
  }

  public getProgressbarValue(): void {
    this.testCount++;
    if (this.testCount === 60) {
      this.hourCount++;
      this.testCount = 0;
    }
    console.log('COUNT ', this.hourCount, this.testCount);
    const startDate = moment.unix(this.tvshow.start!).toDate();
    const stopDate = moment.unix(this.tvshow.stop!).toDate();
    const date = new Date(`2021-07-06 ${this.hourCount}:${this.testCount}`);
    const progressRange = Math.floor((stopDate.getTime() - startDate.getTime()) / 60000);
    const timePoint = Math.floor((date.getTime() - startDate.getTime()) / 60000);
    const value = Math.floor((timePoint * 100) / progressRange);
    console.log('present: ', value);
    this.progressbarValue$.next(value);
  //   setInterval(() => {
  //     this.testCount++;
  //     console.log('testCount ', this.testCount);
  //     clearInterval();
  //     this.setProgressbarAndFlags();
  //   }, 10000);
  }
}
