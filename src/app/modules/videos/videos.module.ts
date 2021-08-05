import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { VideosComponent } from './videos.component';
import { reducers } from './store/reducers';
import { VideosCategoryEffect } from './store/effects/videos-category.effect';
import { SliderComponent } from './components/slider/slider.component';
import { SliderImgComponent } from './components/slider/components/slider-img/slider-img.component';

@NgModule({
  declarations: [VideosComponent, SliderComponent, SliderImgComponent],
  imports: [
    CommonModule,
    IvyCarouselModule,
    MatButtonModule,
    StoreModule.forFeature('videos', reducers),
    EffectsModule.forFeature([VideosCategoryEffect]),
  ],
})
export class VideosModule {}
