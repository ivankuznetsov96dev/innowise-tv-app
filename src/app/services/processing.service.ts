import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class ProcessingService {
  public getProgressbarValue(start: number, stop: number): number {
    const now = moment();
    const progressRange = moment.unix(stop).diff(moment.unix(start), 'seconds');
    const timePoint = moment(now).diff(moment.unix(start), 'seconds');
    return (timePoint * 100) / progressRange;
  }

  public getLiveAndRecordingFlag(start: number, stop: number): any {
    const startDate = moment.unix(start);
    const stopDate = moment.unix(stop);
    const now = moment();
    const liveFlag = now >= startDate && now < stopDate;
    const recordingFlag = now > startDate && now >= stopDate;
    return {
      liveFlag,
      recordingFlag,
    };
  }
}
