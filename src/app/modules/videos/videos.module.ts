import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { VideosComponent } from './videos.component';
import { reducers } from './store/reducers';
import { VideosCategoryEffect } from './store/effects/videos-category.effect';
import { SliderComponent } from './components/slider/slider.component';
import { VideosListComponent } from './components/videos-list/videos-list.component';
import { ChipsModule } from '../../shared/components/chips/chips.module';

@NgModule({
  declarations: [VideosComponent, SliderComponent, VideosListComponent],
  imports: [
    CommonModule,
    ChipsModule,
    IvyCarouselModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    StoreModule.forFeature('videos', reducers),
    EffectsModule.forFeature([VideosCategoryEffect]),
  ],
})
export class VideosModule {}
