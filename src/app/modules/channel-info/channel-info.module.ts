import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

import { ChannelInfoComponent } from './channel-info.component';
import { TvshowComponent } from './components/tvshow/tvshow.component';
import { TvshowInfoComponent } from './components/tvshow-info/tvshow-info.component';

@NgModule({
  declarations: [ChannelInfoComponent, TvshowComponent, TvshowInfoComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatIconModule,
  ],
})
export class ChannelInfoModule {}
