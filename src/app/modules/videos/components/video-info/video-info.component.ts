import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { VideoInfoModel } from '../../../../shared/interfaces/video-info.model';
import { videoInfoSelector } from '../../store/selectors';

@Component({
  selector: 'app-video-info',
  templateUrl: './video-info.component.html',
  styleUrls: ['./video-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoInfoComponent implements OnInit {
  public videoInfo$!: Observable<VideoInfoModel | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValue();
  }

  public initializeValue(): void {
    this.videoInfo$ = this.store.pipe(select(videoInfoSelector));
  }
}
