import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MatCardModule} from '@angular/material/card';
import {BrowserModule} from "@angular/platform-browser";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatNativeDateModule } from '@angular/material/core';

import {ChannelsComponent} from "./chanels_module/components/channels/channels.component";
import {ChannelCardComponent} from "./chanels_module/components/channel-card/channel-card.component";
import {ChannelInfoComponent} from "./chanels_module/components/channel-info/channel-info.component";

const routes: Routes = [
  { path: '', redirectTo: '/channels', pathMatch: 'full' },
  { path: 'channels', component: ChannelsComponent },
  { path: 'channel-info', component: ChannelInfoComponent },
];

@NgModule({
  declarations: [
    ChannelsComponent,
    ChannelCardComponent,
    ChannelInfoComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  exports: [
    RouterModule
  ]
})
export class ChannelsModule { }
