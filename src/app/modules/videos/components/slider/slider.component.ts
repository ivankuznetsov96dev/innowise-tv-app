import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MoviesCategoryModel } from '../../../../shared/interfaces/movies-category.model';
import { VideosService } from '../../../../shared/services/videos.service';
import { VideoWripperModel } from '../../../../shared/interfaces/video-wripper.model';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent implements OnInit {
  @Input() category!: MoviesCategoryModel;

  public videosCategoryContent$!: Observable<VideoWripperModel>;

  public videosCategoryContent!: VideoWripperModel;

  constructor(private store: Store, private videos: VideosService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    // console.log(this.category.id)
    this.videosCategoryContent$ = this.videos.getVideosContent(this.category.id);
    // this.videos
    //   .getVideosContent(this.category.id)
    //   .subscribe((value) => {
    //     this.videosCategoryContent = value;
    //     console.log(this.videosCategoryContent.videos);
    //     this.changeDetector.detectChanges();
    //   });
  }
}
