import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { count } from 'rxjs/operators';
import { ChannelService } from '../../../../services/channel.service';
import { TvshowModel } from '../../../channels/interfaces/tvshow.model';

@Component({
  selector: 'app-tvshow',
  templateUrl: './tvshow.component.html',
  styleUrls: ['./tvshow.component.scss'],
})
export class TvshowComponent implements OnInit, OnChanges {
  @Input() tvshow!: TvshowModel;

  public showStart!: string;

  public showStop!: string;

  public liveFlag = false;

  public recordingFlag = false;

  public checkedRenderFlag = 0;

  public progressbarValue$: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  public progressbarValue!: number;

  // public date = new Date(`2021-07-07 ${this.hourCount}:${this.testCount}`);

  @Input() countOnChild!: Date;

  constructor(private channel: ChannelService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.setProgressbarAndFlags();
  }

  ngOnInit(): void {
    this.showStart = moment.unix(this.tvshow.start!).locale('ru').format('dd HH:mm');
    this.showStop = moment.unix(this.tvshow.stop!).locale('ru').format('dd HH:mm');
    this.setProgressbarAndFlags();
    // this.channel.getSomevone.subscribe(() => {
    //   this.setProgressbarAndFlags();
    // });

    // setInterval(() => {
    //   console.log('testCount ', this.testCount);
    //   this.setProgressbarAndFlags();
    // }, 1000);
  }

  // ngDoCheck(): void {
  // this.channel.getSomevone.subscribe(() => {
  //   if (this.checkedRenderFlag !== this.channel.token) {
  //     this.checkedRenderFlag = this.channel.token;
  //     this.setProgressbarAndFlags();
  //   }
  // });
  // this.progressbarValue$.subscribe((value) => {
  //   if (value === 100) {
  //     // this.setProgressbarAndFlags();
  //     console.log('Check!');
  //     this.setProgressbarAndFlags();
  //   }
  // });

  // this.zone.run(() => {
  //   this.progressbarValue$.subscribe((value) => {
  //     if (value === 100) {
  //       // this.setProgressbarAndFlags();
  //       console.log('Check!');
  //       this.setProgressbarAndFlags();
  //     }
  //   });
  // });
  // }

  public setProgressbarAndFlags(): void {
    const startDate = moment.unix(this.tvshow.start!).toDate();
    const stopDate = moment.unix(this.tvshow.stop!).toDate();
    // const date = new Date(`2021-07-07 ${this.countOnChild}`);
    // console.log(date);
    // this.liveFlag = !!(this.date > count1 && this.date < count2);
    // this.recordingFlag = !!(this.date > count1 && this.date > count2);
    console.log(this.countOnChild);
    if (this.countOnChild >= startDate && this.countOnChild < stopDate) {
      this.liveFlag = true;
    } else {
      this.liveFlag = false;
    }
    if (this.countOnChild > startDate && this.countOnChild >= stopDate) {
      this.recordingFlag = true;
    } else {
      this.recordingFlag = false;
    }
    // console.log(this.tvshow.title, 'Date: ', this.countOnChild);
    // console.log('FLAG ', this.liveFlag, this.recordingFlag);
    if (this.liveFlag === true) {
      this.getProgressbarValue();
    }
  }

  public test(): void {
    // this.setProgressbarAndFlags();
    // console.log('testCount: ', this.testCount);
  }

  public getProgressbarValue(): void {
    console.log('COUNT ', this.countOnChild);
    const startDate = moment.unix(this.tvshow.start!).toDate();
    const stopDate = moment.unix(this.tvshow.stop!).toDate();
    // const date = new Date(`2021-07-07 ${this.countOnChild}`);
    const progressRange = Math.floor((stopDate.getTime() - startDate.getTime()) / 60000);
    const timePoint = Math.floor((this.countOnChild.getTime() - startDate.getTime()) / 60000);
    const value = Math.floor((timePoint * 100) / progressRange);
    console.log('present: ', value);
    this.progressbarValue = value;
    // this.progressbarValue$.next(value);
    // if (value === 100) this.progressbarValue$.next(0);
    //   setInterval(() => {
    //     this.testCount++;
    //     console.log('testCount ', this.testCount);
    //     clearInterval();
    //     this.setProgressbarAndFlags();
    //   }, 10000);
  }
}
