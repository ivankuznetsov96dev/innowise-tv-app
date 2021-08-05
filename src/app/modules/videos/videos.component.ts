import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { VideosService } from '../../shared/services/videos.service';
import { videosCategoryAction } from './store/actions/videos-category.action';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideosComponent implements OnInit {
  constructor(private router: Router, private videos: VideosService, private store: Store) {}

  ngOnInit(): void {
    // this.videos.getVideosCategory().subscribe(value => console.log(value));
    this.store.dispatch(videosCategoryAction());
  }
}
