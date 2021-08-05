import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { VideosService } from '../../shared/services/videos.service';
import { videosCategoryAction } from './store/actions/videos-category.action';
import { MoviesCategoryModel } from '../../shared/interfaces/movies-category.model';
import { videosCategorySelector } from './store/selectors';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideosComponent implements OnInit {
  public categoriesCounter$!: Observable<MoviesCategoryModel[]>;

  constructor(private router: Router, private videos: VideosService, private store: Store) {}

  ngOnInit(): void {
    this.initializeData();
    this.initializeValues();
  }

  public initializeData(): void {
    this.store.dispatch(videosCategoryAction());
  }

  public initializeValues(): void {
    this.categoriesCounter$ = this.store.pipe(select(videosCategorySelector));
  }
}
