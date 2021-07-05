import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { ChannelsComponent } from './channels.component';
import { ChannelCardComponent } from './components/channel-card/channel-card.component';
import { ChipsComponent } from './components/chips/chips.component';

@NgModule({
  declarations: [ChannelsComponent, ChannelCardComponent, ChipsComponent],
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
  ],
  exports: [],
})
export class ChannelsModule {}
