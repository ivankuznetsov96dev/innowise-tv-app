import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ChannelsComponent } from './channels.component';
import { ChannelCardComponent } from './components/channel-card/channel-card.component';
import { ChipsComponent } from './components/chips/chips.component';

@NgModule({
  declarations: [ChannelsComponent, ChannelCardComponent, ChipsComponent],
  imports: [
    BrowserModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    ScrollingModule,
    MatChipsModule,
    MatProgressSpinnerModule,
  ],
  exports: [],
})
export class ChannelsModule {}
