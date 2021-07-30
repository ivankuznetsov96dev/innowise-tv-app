import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { CardTvshowComponent } from './components/card-tvshow/card-tvshow.component';
import { ChannelCardComponent } from './channel-card.component';

@NgModule({
  declarations: [ChannelCardComponent, CardTvshowComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    ScrollingModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
  ],
  exports: [ChannelCardComponent, CardTvshowComponent],
})
export class ChannelCardModule {}
