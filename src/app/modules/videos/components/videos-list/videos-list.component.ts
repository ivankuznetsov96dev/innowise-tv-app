import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { videosCategoryAction } from '../../store/actions/videos-category.action';
import { videosContentListAction, videosListAction } from '../../store/actions/videos-list.action';
import { videosCategoryInfoSelector, videosListSelector } from '../../store/selectors';
import { MoviesCategoryModel } from '../../../../shared/interfaces/movies-category.model';
import { VideoWripperModel } from '../../../../shared/interfaces/video-wripper.model';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideosListComponent implements OnInit {
  public categoryId: number;

  public videosCategoryInfo$!: Observable<MoviesCategoryModel>;

  public videosListInfo$!: Observable<VideoWripperModel | null>;

  public isChipsNotHidden = false;

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
    this.categoryId = parseInt(this.route.snapshot.params.videosCategoryList, 10);
    this.store.dispatch(videosListAction({ videos_category_id: this.categoryId }));
  }

  ngOnInit(): void {
    this.initializeData();
    this.initializeValues();
  }

  public initializeData(): void {
    this.store.dispatch(videosCategoryAction());
    this.store.dispatch(videosContentListAction({ category_id: this.categoryId }));
  }

  public initializeValues(): void {
    this.videosCategoryInfo$ = this.store.pipe(select(videosCategoryInfoSelector));
    this.videosListInfo$ = this.store.pipe(select(videosListSelector));
  }

  public changeCategory(event: number): void {
    this.store.dispatch(videosContentListAction({ category_id: this.categoryId, genre_id: event }));
    this.router.navigate(['videos-list', this.categoryId, event]);
  }

  public chipsDropdown(): void {
    this.isChipsNotHidden = !this.isChipsNotHidden;
  }
}
