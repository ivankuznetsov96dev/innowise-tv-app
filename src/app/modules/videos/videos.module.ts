import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { VideosCategoryEffect } from './store/effects/videos-category.effect';
import { reducers } from './store/reducers';

import { VideosComponent } from './videos.component';
import { SliderComponent } from './components/slider/slider.component';
import { VideosListComponent } from './components/videos-list/videos-list.component';
import { ChipsModule } from '../../shared/components/chips/chips.module';
import { VideosListEffect } from './store/effects/videos-list.effect';
import { VideoInfoComponent } from './components/video-info/video-info.component';
import { VideoInfoEffect } from './store/effects/video-info.effect';

@NgModule({
  declarations: [VideosComponent, SliderComponent, VideosListComponent, VideoInfoComponent],
  imports: [
    CommonModule,
    ChipsModule,
    MatIconModule,
    IvyCarouselModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
    MatDialogModule,
    StoreModule.forFeature('videos', reducers),
    EffectsModule.forFeature([VideosCategoryEffect, VideosListEffect, VideoInfoEffect]),
  ],
})
export class VideosModule {}
