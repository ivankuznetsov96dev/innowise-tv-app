import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { VideoInfoModel } from '../../../../../../shared/interfaces/video-info.model';

@Component({
  selector: 'app-slider-img',
  templateUrl: './slider-img.component.html',
  styleUrls: ['./slider-img.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderImgComponent implements OnInit {
  @Input() videoInfo!: VideoInfoModel;

  public urlInterceptor =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSclDO5LQ1CfGhoe_DOJc183T0XGJxnlXGcAg&usqp=CAU';

  constructor() {}

  ngOnInit(): void {}

  public test(): void {
    console.log(this.videoInfo);
  }
}
