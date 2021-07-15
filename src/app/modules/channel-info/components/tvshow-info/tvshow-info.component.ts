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
import { ActivatedRoute } from '@angular/router';
import { TvshowsService } from 'src/app/services/tvshows.service';
import { TvshowTitleModel } from 'src/app/interfaces/tvshow-title.model';
import { VideoInfoModel } from 'src/app/interfaces/video-info.model';
import { MovieCategory } from 'src/app/interfaces/movies-category.model';
import {DirectorNameAndRole} from "../../../../interfaces/person-info.model";

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

  // public videoInfo$!: Observable<VideoInfoModel>;

  public videoInfo!: VideoInfoModel;

  public videoGenres$!: Observable<MovieCategory[]>;

  public videoDirector$!: Observable<DirectorNameAndRole[]> | null;

  public isSpinnerFlag = true;

  public screenshotPicture!: string;

  constructor(private tvserv: TvshowsService, public route: ActivatedRoute) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.videoDirector$ = null;
    this.tvserv.getTvshowTitleInfo(this.tvTitleId).subscribe((value) => {
      this.screenshotPicture = this.tvserv.getTvScreenshot(this.route.snapshot.params.channelId);
    });
    this.showTitle$ = this.tvserv.getTvshowTitleInfo(this.tvTitleId);
    this.tvserv.getTvshowDeepInfo(this.tvTitleId).subscribe((value) => {
      // console.log(value);
      this.videoInfo = value;
      this.videoGenres$ = this.tvserv.getMoviesCategories(value.category_id, value.genres);
      if (value.director.length)
        this.videoDirector$ = this.tvserv.getDirectorInfo(value.director, value.video_id);
    });
  }

  ngOnInit(): void {}

  // public isString(val: MovieCategory[] | string): boolean {
  //   return typeof val === 'string';
  // }

  public pressedCloseBtn(): void {
    this.selectedCloseBtn.next(false);
  }
}
