import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MatCardModule} from '@angular/material/card';
import {BrowserModule} from "@angular/platform-browser";

import {ChannelsComponent} from "./chanels_module/components/channels/channels.component";
import {ChannelCardComponent} from "./chanels_module/components/chanel-card/channel-card.component";

const routes: Routes = [
  { path: '', redirectTo: '/channels', pathMatch: 'full' },
  { path: 'channels', component: ChannelsComponent },
];

@NgModule({
  declarations: [
    ChannelsComponent,
    ChannelCardComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild(routes),
    MatCardModule,
  ],
  exports: [
    RouterModule
  ]
})
export class ChannelsModule { }
