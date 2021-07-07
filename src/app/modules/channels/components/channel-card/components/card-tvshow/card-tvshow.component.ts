import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TvshowModel } from '../../../../interfaces/tvshow.model';
import * as moment from "moment";

@Component({
  selector: 'app-card-tvshow',
  templateUrl: './card-tvshow.component.html',
  styleUrls: ['./card-tvshow.component.scss'],
})
export class CardTvshowComponent implements OnInit, OnChanges {
  @Input() tvshow!: TvshowModel;

  @Input() countOnChild!: Date;

  public showStart!: string;

  public showStop!: string;

  public liveFlag = false;

  public recordingFlag = false;

  public progressbarValue$: BehaviorSubject<any> = new BehaviorSubject<any>(0);

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
    this.liveFlag = this.countOnChild >= startDate && this.countOnChild < stopDate;
    this.recordingFlag = this.countOnChild > startDate && this.countOnChild >= stopDate;
    if (this.liveFlag) this.getProgressbarValue();
  }

  public getProgressbarValue(): void {
    const startDate = moment.unix(this.tvshow.start!).toDate();
    const stopDate = moment.unix(this.tvshow.stop!).toDate();
    const progressRange = Math.floor((stopDate.getTime() - startDate.getTime()) / 60000);
    const timePoint = Math.floor((this.countOnChild.getTime() - startDate.getTime()) / 60000);
    const value = Math.floor((timePoint * 100) / progressRange);
    console.log('present: ', value);
    this.progressbarValue$.next(value);
  }
}


