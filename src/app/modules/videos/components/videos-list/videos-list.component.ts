import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { videosCategoryAction } from '../../store/actions/videos-category.action';
import { videosContentListAction, videosListAction } from '../../store/actions/videos-list.action';
import {
  paginatorSizeSelector,
  videosCategoryInfoSelector,
  videosListSelector,
} from '../../store/selectors';
import { MoviesCategoryModel } from '../../../../shared/interfaces/movies-category.model';
import { VideoWripperModel } from '../../../../shared/interfaces/video-wripper.model';
import { VideoInfoModel } from '../../../../shared/interfaces/video-info.model';
import { videoInfoAction } from '../../store/actions/video-info.action';
import { VideoInfoComponent } from '../video-info/video-info.component';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideosListComponent implements OnInit, OnDestroy {
  public categoryId: number;

  public videosCategoryInfo$!: Observable<MoviesCategoryModel>;

  public videosListInfo$!: Observable<VideoWripperModel | null>;

  public videosGenreId: number;

  public page: number;

  public paginatorValueArray: number[] = [];

  public isChipsNotHidden = false;

  public subjDestroyer: Subject<any> = new Subject<any>();

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.categoryId = parseInt(this.route.snapshot.params.videosCategoryList, 10);
    this.videosGenreId = parseInt(this.route.snapshot.params.genre, 10);
    this.page = parseInt(this.route.snapshot.params.page, 10);
    this.store.dispatch(videosListAction({ videos_category_id: this.categoryId }));
  }

  ngOnInit(): void {
    this.initializeData();
    this.initializeValues();
  }

  public initializeData(): void {
    this.store.dispatch(videosCategoryAction());
    this.store.dispatch(
      videosContentListAction({
        category_id: this.categoryId,
        genre_id: this.videosGenreId,
        offset: this.page,
      }),
    );
  }

  public initializeValues(): void {
    this.videosCategoryInfo$ = this.store.pipe(select(videosCategoryInfoSelector));
    this.videosListInfo$ = this.store.pipe(select(videosListSelector));

    this.store
      .pipe(select(paginatorSizeSelector), takeUntil(this.subjDestroyer))
      .subscribe((value) => {
        this.paginatorValueArray = [];
        for (let i = 1; i <= value; i++) {
          this.paginatorValueArray.push(i);
        }
      });
  }

  public changeCategory(event: number): void {
    this.videosGenreId = event;
    this.page = 1;
    this.store.dispatch(videosContentListAction({ category_id: this.categoryId, genre_id: event }));
    this.router.navigate(['videos-list', this.categoryId, event, this.page]);
  }

  public chipsDropdown(): void {
    this.isChipsNotHidden = !this.isChipsNotHidden;
  }

  public changeVideosList(page: number): void {
    console.log(page);
    this.router.navigate(['videos-list', this.categoryId, this.videosGenreId, page]);
    this.store.dispatch(
      videosContentListAction({
        category_id: this.categoryId,
        offset: this.page,
        genre_id: this.videosGenreId,
      }),
    );
  }

  public goBack(): void {
    this.router.navigate(['videos']);
  }

  ngOnDestroy(): void {
    this.subjDestroyer.next();
  }

  public openDialog(videoCard: VideoInfoModel): void {
    console.log(videoCard);
    this.store.dispatch(videoInfoAction({ video_id: videoCard.video_id }));
    const dialogRef = this.dialog.open(VideoInfoComponent);
  }
}
