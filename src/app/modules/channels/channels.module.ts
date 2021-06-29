import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

import { ChannelsComponent } from './channels.component';
import { ChannelCardComponent } from './components/channel-card/channel-card.component';

@NgModule({
  declarations: [ChannelsComponent, ChannelCardComponent],
  imports: [
    BrowserModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  exports: [],
})
export class ChannelsModule {}
