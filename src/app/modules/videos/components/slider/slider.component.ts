import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
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

  public isLoading$!: Observable<boolean>;

  public urlInterceptor =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSclDO5LQ1CfGhoe_DOJc183T0XGJxnlXGcAg&usqp=CAU';

  constructor(
    private store: Store,
    private videos: VideosService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.videosCategoryContent$ = this.videos.getVideosContent(this.category.id);
  }

  public moveOnVideosCategoryList(): void {
    this.router.navigate(['videos-list', this.category.id, 0, 1]);
  }

  public test(slide: any): void {
    console.log(slide);
  }
}
