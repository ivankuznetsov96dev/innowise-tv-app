import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import { videosCategoryAction } from '../../store/actions/videos-category.action';
import { videosListAction } from '../../store/actions/videos-list.action';
import {videosCategoryInfoSelector} from "../../store/selectors";
import {Observable} from "rxjs";
import {MoviesCategoryModel} from "../../../../shared/interfaces/movies-category.model";
import {changeChannelCategoryAction} from "../../../../store/actions/change-channel-category.action";

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideosListComponent implements OnInit {
  public categoryId: number;
  public videosCategoryInfo$!: Observable<MoviesCategoryModel>;

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
  }

  public initializeValues(): void {
    this.videosCategoryInfo$ = this.store.pipe(select(videosCategoryInfoSelector));
  }

  public changeCategory(event: number): void {
    // this.store.dispatch(changeChannelCategoryAction({ id: event }));
    this.router.navigate(['videos-list', this.categoryId, event]);
  }
}
