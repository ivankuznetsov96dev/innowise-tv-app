import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class ProcessingService {
  public getProgressbarValue(start: number, stop: number, now: Date): number {
    const startDate = moment.unix(start).toDate();
    const stopDate = moment.unix(stop).toDate();
    const progressRange = Math.floor((stopDate.getTime() - startDate.getTime()) / 60000);
    const timePoint = Math.floor((now.getTime() - startDate.getTime()) / 60000);
    const value = Math.floor((timePoint * 100) / progressRange);
    return value;
  }

  public getLiveAndRecordingFlag(start: number, stop: number, now: Date): any {
    const startDate = moment.unix(start).toDate();
    const stopDate = moment.unix(stop).toDate();
    const liveFlag = now >= startDate && now < stopDate;
    const recordingFlag = now > startDate && now >= stopDate;
    return {
      liveFlag,
      recordingFlag,
    };
  }
}
