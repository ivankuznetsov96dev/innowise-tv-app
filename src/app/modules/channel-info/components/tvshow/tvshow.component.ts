import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
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

  public progressbarValue$: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  // public progressbarValue!: number;

  // public date = new Date(`2021-07-07 ${this.hourCount}:${this.testCount}`);

  @Input() countOnChild!: Date;

  ngOnChanges(changes: SimpleChanges): void {
    this.setProgressbarAndFlags();
  }

  ngOnInit(): void {
    this.showStart = moment.unix(this.tvshow.start!).locale('ru').format('dd HH:mm');
    this.showStop = moment.unix(this.tvshow.stop!).locale('ru').format('dd HH:mm');
  }

  public setProgressbarAndFlags(): void {
    const startDate = moment.unix(this.tvshow.start!).toDate();
    const stopDate = moment.unix(this.tvshow.stop!).toDate();
    // const date = new Date(`2021-07-07 ${this.countOnChild}`);
    // this.liveFlag = !!(this.date > count1 && this.date < count2);
    // this.recordingFlag = !!(this.date > count1 && this.date > count2);
    this.liveFlag = this.countOnChild >= startDate && this.countOnChild < stopDate;
    this.recordingFlag = this.countOnChild > startDate && this.countOnChild >= stopDate;
    if (this.liveFlag) this.getProgressbarValue();
  }

  public getProgressbarValue(): void {
    const startDate = moment.unix(this.tvshow.start!).toDate();
    const stopDate = moment.unix(this.tvshow.stop!).toDate();
    // const date = new Date(`2021-07-07 ${this.countOnChild}`);
    const progressRange = Math.floor((stopDate.getTime() - startDate.getTime()) / 60000);
    const timePoint = Math.floor((this.countOnChild.getTime() - startDate.getTime()) / 60000);
    const value = Math.floor((timePoint * 100) / progressRange);
    console.log('present: ', value);
    // this.progressbarValue = value;
    this.progressbarValue$.next(value);
  }
}
