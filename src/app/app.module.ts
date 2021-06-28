import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule} from '@angular/material/card';

import { AppComponent } from './app.component';
import {ChannelsComponent} from "./modules/chanels_module/channels/channels.component";
import {ChannelCardComponent} from "./modules/chanels_module/chanel-card/channel-card.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ChannelsComponent,
    ChannelCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
