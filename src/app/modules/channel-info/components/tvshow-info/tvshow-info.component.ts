import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { TvshowsService } from '../../../../services/tvshows.service';
import { TvshowTitleModel } from '../../../../interfaces/tvshow-title.model';
import { VideoInfoModel } from '../../../../interfaces/video-info.model';

@Component({
  selector: 'app-tvshow-info',
  templateUrl: './tvshow-info.component.html',
  styleUrls: ['./tvshow-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvshowInfoComponent implements OnInit, OnChanges {
  @Input() tvTitleId!: string;

  @Output() selectedCloseBtn: EventEmitter<boolean> = new EventEmitter<boolean>();

  public showTitle$!: Observable<TvshowTitleModel>;

  public videoInfo$!: Observable<VideoInfoModel>;

  public isSpinnerFlag = true;

  constructor(private tvserv: TvshowsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.showTitle$ = this.tvserv.getTvshowTitleInfo(this.tvTitleId);
    this.videoInfo$ = this.tvserv.getTvshowDeepInfo(this.tvTitleId);
    this.tvserv.getTvshowDeepInfo(this.tvTitleId).subscribe(value => console.log(value))
  }

  ngOnInit(): void {}

  public pressedCloseBtn(): void {
    this.selectedCloseBtn.next(false);
  }
}
