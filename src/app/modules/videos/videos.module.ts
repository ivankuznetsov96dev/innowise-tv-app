import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { VideosComponent } from './videos.component';
import { reducers } from './store/reducers';
import { VideosCategoryEffect } from './store/effects/videos-category.effect';

@NgModule({
  declarations: [VideosComponent],
  imports: [
    CommonModule,
    IvyCarouselModule,
    StoreModule.forFeature('videos', reducers),
    EffectsModule.forFeature([VideosCategoryEffect]),
  ],
})
export class VideosModule {}
