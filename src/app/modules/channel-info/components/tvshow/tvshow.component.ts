import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { BehaviorSubject } from 'rxjs';
import { TvshowModel } from '../../../channels/interfaces/tvshow.model';
import { ProcessingService } from '../../../../services/processing.service';

@Component({
  selector: 'app-tvshow',
  templateUrl: './tvshow.component.html',
  styleUrls: ['./tvshow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvshowComponent implements OnInit, OnChanges {
  @Input() tvshow!: TvshowModel;

  public showStart!: string;

  public showStop!: string;

  public liveFlag = false;

  public recordingFlag = false;

  public progressbarValue$: BehaviorSubject<any> = new BehaviorSubject<any>(0);

  @Input() countOnChild!: Moment;

  constructor(private process: ProcessingService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.setProgressbarAndFlags();
  }

  ngOnInit(): void {
    this.showStart = moment.unix(this.tvshow.start!).locale('ru').format('dd HH:mm');
    this.showStop = moment.unix(this.tvshow.stop!).locale('ru').format('dd HH:mm');
  }

  public setProgressbarAndFlags(): void {
    const flag = this.process.getLiveAndRecordingFlag(this.tvshow.start!, this.tvshow.stop!);
    this.liveFlag = flag.liveFlag;
    this.recordingFlag = flag.recordingFlag;
    if (this.liveFlag) this.installProgressbarValue();
  }

  public installProgressbarValue(): void {
    const value = this.process.getProgressbarValue(this.tvshow.start!, this.tvshow.stop!);
    console.log('present: ', value);
    this.progressbarValue$.next(value);
  }
}
